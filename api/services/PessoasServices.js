
const { NaoEncontrado } = require('../errors')
const { sequelize } = require('../models')
const { models, Services } = require('./Services')

class PessoasServices extends Services {
    constructor () {
        super('Pessoas')
        this.limit = 20
        this.offset = null
        this.order = [['nome', 'ASC']]

        this.turmas = new Services('Turmas')
        this.matriculas = new Services('Matriculas')
    }
    // deixar o where lá e outros dados aqui
    async pegaPessoasAtivas (campos) {
        const { where, attributes, page, limit, order } = campos
        super.option({ attributes, page, limit, order })

        const todos = await models[this.modelo].scope('ativo').findAndCountAll({
            where: { ...where },
            attributes,
            limit: this.limit,
            offset: this.offset,
            order: this.order
        })
        return this.serializacao(todos)
    }

    async pegaPessoasNAtivas (campos) {
        const { where, attributes, page, limit, order } = campos
        super.option({ attributes, page, limit, order })

        const todos = await models[this.modelo].scope('nao_ativo').findAndCountAll({
            where: { ...where },
            attributes,
            limit: this.limit,
            offset: this.offset,
            order: this.order
        })
        return this.serializacao(todos)
    }

    async pegaEstudantes (campos) {
        const { where, attributes, page, limit, order } = campos
        super.option({ attributes, page, limit, order })

        const todos = models[this.modelo].scope('estudante').findAndCountAll({
            where: { ...where },
            attributes,
            limit: this.limit,
            offset: this.offset,
            order: this.order
        })
        return this.serializacao(todos)
    }

    async pegaUmEstudante (estudanteId) {
        const pessoaEncontrada = await models[this.modelo].findOne({ where: { id: Number(estudanteId), role: 'estudante' } })
        if (pessoaEncontrada === null) {
            throw new NaoEncontrado(`${this.modelo.substring(0,this.modelo.length-1)}: Pessoa não é estudante!`)
        }

        return pessoaEncontrada
    }

    async pegaDocentes (campos) {
        const { where, attributes, page, limit, order } = campos
        super.option({ attributes, page, limit, order })

        const todos = await models[this.modelo].scope('docente').findAndCountAll({
            where: { ...where },
            attributes,
            limit: this.limit,
            offset: this.offset,
            order: this.order
        })
        return this.serializacao(todos)
    }

    async pegaUmDocente (docenteId) {
        const pessoaEncontrada = await models[this.modelo].findOne({ where: { id: Number(docenteId), role: 'docente' } })
        if (pessoaEncontrada === null) {
            throw new NaoEncontrado(`${this.modelo.substring(0,this.modelo.length-1)}: Pessoa não é professor!`)
        }

        return pessoaEncontrada
    }

    async pegaTodasAsTurmasDeUmDocente (docenteId, campos) {
        await this.pegaUmDocente(docenteId)
        const todos = await this.turmas.pegaTodos(campos)
        return this.serializacao(todos)
    }

    async pegaTodasAsMatriculasDeUmEstudante (estudanteId, campos) {
        await this.pegaUmEstudante(estudanteId)
        const todos = await this.matriculas.pegaTodos(campos)
        return this.serializacao(todos)
    }

    async cancelaPessoaEMatriculas (estudanteId) {
        return sequelize.transaction(async transacao => {
            await super.atualiza({ ativo: 'false' }, { where: { id: Number(estudanteId) } }, { transaction: transacao })
            await this.matriculas.atualiza({ status: 'cancelado'} , { where: { estudante_id: Number(estudanteId) } }, { transaction: transacao } )
        })
    }

    async pegaTurma (id, docenteId) {
        await this.pegaUmDocente(docenteId)
        return this.turmas.pegaUm(id)
    }

    async pegaMatriculas (estudanteId, campos) {
        const { where, attributes, page, limit, order } = campos
        this.order = null
        super.option({ attributes, page, limit, order })

        const estudante = await this.pegaUmEstudante(estudanteId)
        const todos = estudante.getAulasMatriculadas({
            where: { ...where },
            attributes,
            limit: this.limit,
            offset: this.offset,
            order: this.order
        })
        return this.serializacao(todos)
    }

    async pegaMatricula (id, estudanteId) {
        await this.pegaUmEstudante(estudanteId)
        return this.matriculas.pegaUm(id)
    }
}

module.exports = PessoasServices