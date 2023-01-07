const { Sequelize } = require("../models");
const { Services, models } = require("./Services");

class MatriculasServices extends Services {
    constructor () {
        super('Matriculas')

        this.attributes = ['id', 'status', 'estudante_id', 'turma_id']
        this.limit = 20
        this.offset = null
        this.order = [['turma_id', 'ASC']]
    }

    async pegaTurmasLotadas (lotacaoTurma = 2) {
        return models[this.modelo].findAndCountAll({
            where: { status: 'confirmado' },
            attributes: ['turma_id'],
            group: ['turma_id'],
            having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
        })
    }

    async pegaMatriculasConfirmadasOuCanceladas (campos = {}, fator = 'confirmado') {
        if (['confirmado', 'cancelado'].indexOf(fator.toLowerCase()) === -1) {
            throw new Error('Não é nem confimado ou cancelado')
        }

        const { where, attributes, page, limit, order } = campos
        super.option({ attributes, page, limit, order })

        const todos = await models[this.modelo].scope(fator).findAndCountAll({
            where: { ...where },
            attributes,
            limit: this.limit,
            offset: this.offset,
            order: this.order
        })
        return this.serializacao(todos)
    }

    async pegaMatriculasApagadas (campos) {
        const todos = await super.pegaTodosApagados(campos)
        return this.serializacao(todos)
    }
}

module.exports = MatriculasServices