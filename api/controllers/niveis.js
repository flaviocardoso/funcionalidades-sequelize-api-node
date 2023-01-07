const { Op } = require('sequelize')

const { NiveisServices } = require('../services')
const niveisServices = new NiveisServices()

class NiveisController {
    static async pegaTodasAsNiveis (req, res, next) {
        const { descr, page, limit, order } = req.query
        const where = {}

        try {
            const attributes = ['id', 'descr_nivel']

            descr ? where.descr_nivel = descr : null

            const todasOsNiveis = await niveisServices
                .pegaTodos({ where, attributes, page, limit, order })
            res.json(todasOsNiveis)  
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmNivel (req, res, next) {
        const { id } = req.params

        try {
            const umNivel = await niveisServices.pegaUm(Number(id))
            res.json(umNivel)
        } catch (error) {
            next(error)
        }
    }

    static async pegaNiveisApagados (req, res, next) {
        const { descr, page, limit, order } = req.query
        const where = {}

        try {
            const attributes = ['id', 'descr_nivel']

            descr ? where.descr_nivel = descr : null

            const todasOsNiveis = await niveisServices
                .pegaTodosApagados({ where, attributes, page, limit, order })
            res.json(todasOsNiveis)  
        } catch (error) {
            next(error)
        }
    }

    static async criaNivel (req, res, next) {
        const novoNivel = req.body

        try {
            const novoNivelCriado = await niveisServices.cria(novoNivel)
            res.json(novoNivelCriado)
        } catch (error) {
            next(error)
        }
    }

    static async pegaTodasAsTurmasDeUmNivel (req, res, next) {
        const { nivelId } = req.params

        const { data_inicial, data_final, page, limit, order } = req.query
        const where = {}
        where.nivel_id = Number(nivelId)

        try {
            const attributes = ['id', 'data_inicio', 'nivel_id', 'docente_id']

            data_inicial || data_final ? where.data_inicio = {} : null
            data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
            data_final ? where.data_inicio[Op.lte] = data_final : null

            const todasAsTurmasDeUmNivel = await niveisServices
                .pegaTodasAsTurmasDeUmNivel({ where, attributes, page, limit, order })
            res.json(todasAsTurmasDeUmNivel)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaTurma (req, res, next) {
        const { nivelId, turmaId } = req.params

        try {
            const turmaEncontrada = await niveisServices.pegaTurma(Number(turmaId), Number(nivelId))
            res.json(turmaEncontrada)
        } catch (error) {
            next(error)
        }
    }

    static async atualizaNivel (req, res, next) {
        const novaInfos = req.body
        const { id } = req.params

        try {
            const nivelAtualizado = await niveisServices.atualiza(novaInfos, { where: { id: Number(id) } })
            res.json(nivelAtualizado)
        } catch (error) {
            next(error)
        }
    }

    static async apagaNivel (req, res, next) {
        const { id } = req.params

        try {
            await niveisServices.apaga(Number(id))
            res.json({ mensagem: `id ${id} deletado!` })
        } catch (error) {
            next(error)
        }
    }

    static async restauraNivel (req, res, next) {
        const { id } = req.params

        try {
            await niveisServices.restaura(Number(id))
            res.json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = NiveisController