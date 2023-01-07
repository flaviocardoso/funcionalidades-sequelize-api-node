const { Services } = require("./Services");

class TurmasServices extends Services {
    constructor () {
        super('Turmas')

        this.attributes = ['id', 'data_inicio', 'docente_id', 'nivel_id']
        this.limit = 20
        this.offset = null
        this.order = [['docente_id', 'ASC']]

        this.matriculas = new Services('Matriculas')
    }

    async pegaTodasAsMatriculasDeUmaTurma (turmaId, campos) {
        await super.pegaUm(turmaId)
        const todos = this.matriculas.pegaTodos(campos)
        return this.serializacao(todos)
    }

    async pegaMatricula (matriculaId, turmaId) {
        await super.pegaUm(turmaId)
        return this.matriculas.pegaUm(matriculaId)
    }

    async pegaTurmasLotadas () {
        const todos = await this.matriculas.pegaTurmasLotadas()
        return this.serializacao(todos)
    }
}

module.exports = TurmasServices