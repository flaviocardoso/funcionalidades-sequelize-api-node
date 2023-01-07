const api = 'http://localhost:3000/api'
const { ParametroNaoAceito, NaoEncontrado } = require('../errors')
const models  = require('../models')

class Services {
    constructor (modelo) {
        this.modelo = modelo

        this.limit = 10000
        this.offset = null
        this.order = null
    }

    serializacao (dado) {
        const { count: total, rows: data } = dado
        const atual = this.offset ? (this.offset/this.limit)+1 : 1
        const paginas = Math.ceil(total/this.limit)
        let prevPage = ( atual !== 1 && atual <= paginas ) ? atual - 1 : null
        let nextPage = ( atual < paginas ) ? atual + 1 : null
        let totalPages = (paginas !== 1) ? { totalPages: paginas } : {}
        let currentPage = (atual <= paginas) ? { currentPage: `${api}/${this.modelo.toLowerCase()}?page=${atual}&limit=${this.limit}` } : {}
        prevPage = prevPage ? { prevPage: `${api}/${this.modelo.toLowerCase()}s?page=${prevPage}&limit=${this.limit}` } : {}
        nextPage = nextPage ? { nextPage: `${api}/${this.modelo.toLowerCase()}?page=${nextPage}&limit=${this.limit}` } : {}

        return { total, ...totalPages, ...prevPage , ...currentPage, ...nextPage, data }
    }

    option (options) {
        const { attributes, page, limit, order } = options

        limit ? this.limit = Number(limit) : null
        page ? this.offset = Number(page) : null
        this.offset ? this.offset = ((this.offset - 1) * this.limit) : null
        order ? this.order = String(order).split(',') : null

        if (order) {
            if (attributes.indexOf(this.order[0]) === -1) {
                throw new ParametroNaoAceito('Coluna de ordem passado não aceito!')
            }
            if (['ASC', 'DESC'].indexOf(this.order[1].toUpperCase()) === -1) {
                throw new ParametroNaoAceito('Ordem da coluna não aceita!')
            }

            this.order = [this.order]
        }
    }

    async pegaTodos (campos) {
        const { where, attributes, page, limit, order } = campos
        this.option({ attributes, page, limit, order })
        
        const todos = await models[this.modelo].findAndCountAll({
            where: { ...where },
            attributes,
            limit: this.limit,
            offset: this.offset,
            order: this.order,
            raw: true
        })
        // console.log(todos.rows);
        return this.serializacao(todos)
    }

    async pegaTodosApagados (campos) {
        const { where, attributes, page, limit, order } = campos
        this.option({ attributes, page, limit, order })

        const todos = await models[this.modelo].scope('apagado').findAndCountAll({
            where: { ...where },
            attributes,
            limit: this.limit,
            offset: this.offset,
            order: this.order,
            paranoid: false
        })
        return this.serializacao(todos)
    }

    async pegaUm (id) {
        const registro = models[this.modelo].findByPk(id)
        if (registro === null) {
            throw new NaoEncontrado(`${this.modelo.substring(0,this.modelo.length-1)}: Não Encontrado`)
        }
        return registro
    }

    async cria (dados) {
        return models[this.modelo].create(dados)
    }

    async atualiza (dadosAtualizados, where, transacao = {}) {
        const { id } = where 
        await this.pegaUm(Number(id))
        await models[this.modelo].update(dadosAtualizados, { where: { ...where }}, transacao)

        return this.pegaUm(Number(id))
    }

    async apaga (id) {
        await this.pegaUm(Number(id))

        return models[this.modelo].destroy({ where: { id } })
    }

    async restaura (id) {
        return models[this.modelo].restore({ where: { id } })
    }
}

module.exports = { models, Services }