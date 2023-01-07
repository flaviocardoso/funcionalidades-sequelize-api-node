
const { Op } = require('sequelize')

const { TurmasServices } = require('../services')
const turmasServices = new TurmasServices()

class TurmasController {
    static async pegaTodasAsTurmas (req, res, next) {
        const { data_inicial, data_final, page, limit, order } = req.query
        const where = {}

        try {
            const attributes = ['id', 'data_inicio', 'docente_id', 'nivel_id']

            data_inicial || data_final ? where.data_inicio = {} : null
            data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
            data_final ? where.data_inicio[Op.lte] = data_final : null

            const todasAsTurmas = await turmasServices
                .pegaTodos({ where, attributes, page, limit, order })
            res.json(todasAsTurmas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaTurma (req, res, next) {
        const { id } = req.params

        try {
            const umaTurma = await turmasServices.pegaUm(Number(id))
            res.json(umaTurma)
        } catch (error) {
            next(error)
        }
    }

    static async pegaTurmasApagadas (req, res, next) {
        const { data_inicial, data_final, page, order } = req.query
        const where = {}

        try {
            const attributes = ['id', 'data_inicio', 'docente_id', 'nivel_id']

            data_inicial || data_final ? where.data_inicio = {} : null
            data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
            data_final ? where.data_inicio[Op.lte] = data_final : null

            const todasAsPessoas = await turmasServices
                .pegaTodosApagados({ where: where, attributes, page, order })
            res.json(todasAsPessoas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaTodasAsMatriculasDeUmaTurma (req, res, next) {
        const { turmaId } = req.params
        const { page, limit, order } = req.query

        const where = {}
        where.turma_id = Number(turmaId)
        where.status = 'confirmado'
        
        try {
            const attributes = ['id', 'status', 'turma_id', 'estudante_id']

            const todasAsMatriculasDeUmaTurma = await turmasServices
                .pegaTodasAsMatriculasDeUmaTurma({ where, attributes, page, limit, order })
            res.json(todasAsMatriculasDeUmaTurma)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaMatricula (req, res, next) {
        const { turmaId, matriculaId } = req.params

        try {
            const umaMatricula = await turmasServices.pegaMatricula(Number(matriculaId), Number(turmaId))
            res.json(umaMatricula)
        } catch (error) {
            next(error)
        }
    }

    static async pegaTurmasLotadas (req, res, next) {
        try {
            const turmasLotadas = await turmasServices.pegaTurmasLotadas()
            res.json(turmasLotadas.count)
        } catch (error) {
            next(error)
        }
    }

    static async criaTurma (req, res, next) {
        const novaTurma = req.body // docente_id, niveil_id

        try {
            const novaTurmaCriada = await turmasServices.cria(novaTurma)
            res.status(201).json(novaTurmaCriada)
        } catch (error) {
            next(error)
        }
    }

    static async atualizaTurma (req, res, next) {
        const novaInfos = req.body // docente_id, niveil_id, data_inicio
        const { id } = req.params

        try {
            const turmaAtualizada = await turmasServices.atualiza(novaInfos, { where: { id: Number(id) } })
            res.json(turmaAtualizada)
        } catch (error) {
            next(error)
        }
    }

    static async apagaTurma (req, res, next) {
        const { id } = req.params

        try {
            await turmasServices.apaga(Number(id))
            res.json({ mensagem: `id ${id} deletado!` })
        } catch (error) {
            next(error)
        }
    }

    static async restauraTurma (req, res, next) {
        const { id } = req.params

        try {
            await turmasServices.restaura(Number(id))
            res.json({ mensagem: `id ${id} restaurado!` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TurmasController