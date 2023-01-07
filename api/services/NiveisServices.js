const { Services } = require("./Services");

class NiveisServices extends Services {
    constructor () {
        super('Niveis')

        this.attributes = ['id', 'descr_nivel']
        this.limit = 20
        this.offset = null
        this.order = [['descr_nivel', 'ASC']]

        this.turmas = new Services('Turmas')
    }

    async pegaTodasAsTurmasDeUmNivel (nivelId, campos) {
        await super.pegaUm(Number(nivelId))
        const todos = await this.turmas.pegaTodos(campos)
        return this.serializacao(todos)
    }

    async pegaTurma (id, nivelId) {
        await super.pegaUm(Number(nivelId))
        const todos = await this.turmas.pegaUm(Number(id))
        return this.serializacao(todos)
    }
}

module.exports = NiveisServices