const { MatriculasServices } = require('../services')

class MatriculasController {
    static async pegaTodasAsMatriculas (req, res, next) {
        const { status, page, limit, order } = req.query
        const where = {}

        try {
            const attributes = ['id', 'status', 'estudante_id', 'turma_id']

            status ? where.status = status : null
            const matriculasServices = new MatriculasServices()
            const todasAsMatriculas = await matriculasServices
                .pegaTodos({ where, attributes, page, limit, order })
            res.json(todasAsMatriculas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaMatricula (req, res, next) {
        const { id } = req.params

        try {
            const matriculasServices = new MatriculasServices()
            const umaMatricula = await matriculasServices.pegaUm(Number(id))
            res.json(umaMatricula)
        } catch (error) {
            next(error)
        }
    }

    static async pegaMatriculasConfirmadas (req, res, next) {
        const { page, limit, order } = req.query

        try {

            const attributes = ['id', 'estudante_id', 'turma_id']
            const matriculasServices = new MatriculasServices()
            const todasAsMatriculas = await matriculasServices
            .pegaMatriculasConfirmadasOuCanceladas({ attributes, page, limit, order })
            res.json(todasAsMatriculas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaMatriculasCanceladas (req, res, next) {
        const { page, limit, order } = req.query

        try {

            const attributes = ['id', 'estudante_id', 'turma_id']
            const matriculasServices = new MatriculasServices()
            const todasAsMatriculas = await matriculasServices
            .pegaMatriculasConfirmadasOuCanceladas({ attributes, page, limit, order }, 'cancelado')
            res.json(todasAsMatriculas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaMatriculasApagadas (req, res, next) {
        const { status, page, limit, order } = req.query
        const where = {}

        try {
            const attributes = ['id', 'status', 'estudante_id', 'turma_id']

            status ? where.status = status : null
            const matriculasServices = new MatriculasServices()
            const todasAsMatriculas = await matriculasServices
                .pegaMatriculasApagadas({ where, attributes, page, limit, order })
            res.json(todasAsMatriculas)
        } catch (error) {
            next(error)
        }
    }
    
    static async criaMatricula (req, res, next) {
        const novaMatricula = req.body // estudante_id, turma_id

        try {
            const matriculasServices = new MatriculasServices()
            const novaMatriculaCriada = await matriculasServices.cria(novaMatricula)
            res.json(novaMatriculaCriada)
        } catch (error) {
            next(error)
        }
    }

    static async atualizaMatricula (req, res, next) {
        const { id } = req.params
        const novaInfos = req.body // estudante_id, turma_id, status

        try {
            const matriculasServices = new MatriculasServices()
            const matriculaAtualizada = await matriculasServices.atualiza(novaInfos, { where: { id: Number(id) } })
            res.json(matriculaAtualizada)
        } catch (error) {
            next(error)
        }
    }

    static async apagaMatricula (req, res, next) {
        const { id } = req.params

        try {
            const matriculasServices = new MatriculasServices()
            await matriculasServices.apaga(Number(id))
            res.json({ mensagem: `id ${id} deleteda!` })
        } catch (error) {
            next(error)
        }
    }

    static async restauraMatricula (req, res, next) {
        const { id } = req.params

        try {
            const matriculasServices = new MatriculasServices()
            await matriculasServices.restaura(Number(id))
            res.json({ mensagem: `id ${id} restaurado!` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MatriculasController