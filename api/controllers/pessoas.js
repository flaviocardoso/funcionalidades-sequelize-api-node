
const { Op } = require('sequelize')
const { PessoasServices } = require('../services')

class PessoasController {
    static async pegaTodasAsPessoas (req, res, next) {
        const { id, nome, role, ativo, page, limit, order } = req.query // page=numPagina order=campo,ordem
        const where = {}

        try {
            role ? where.role = role : null
            ativo ? where.ativo = ativo : null
            id ? where.id = id : null
            nome ? where.nome = { [Op.like]: `%${nome}%` } : null

            const attributes = ['id', 'nome', 'ativo', 'role']
            
            const pessoasServices = new PessoasServices()
            const todasAsPessoas = await pessoasServices
                .pegaTodos({ where, attributes, page, limit, order })
            res.json(todasAsPessoas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaPessoasAtivas (req, res, next) {
        const { id, nome, role, page, limit, order } = req.query
        const where = {}

        try {
            role ? where.role = role : null
            id ? where.id = id : null
            nome ? where.nome = { [Op.like]: `%${nome}%` } : null

            const attributes = ['id', 'nome', 'role']

            const pessoasServices = new PessoasServices()
            const todasAsPessoas = await pessoasServices
                .pegaPessoasAtivas({ where, attributes, page, limit, order})
            res.json(todasAsPessoas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaEstudantes (req, res, next) {
        const { id, nome, page, limit, order } = req.query
        let pagina = 1
        let limite = null
        let ordem = null
        const where = {}

        try {
            id ? where.id = id : null
            nome ? where.nome = { [Op.like]: `%${nome}%` } : null

            const attributes = ['id', 'nome']
            page ? pagina = Number(page) : null
            limit ? limite = Number(limit) : null
            order ? ordem = String(order).split(',') : null
            const pessoasServices = new PessoasServices()
            const todasAsPessoas = await pessoasServices
                .pegaEstudantes({ where, attributes, page: pagina, limit: limite, order: ordem})
            res.json(todasAsPessoas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaDocentes (req, res, next) {
        const { id, nome, page, limit, order } = req.query
        let pagina = 1
        let limite = null
        let ordem = null
        const where = {}

        try {
            id ? where.id = id : null
            nome ? where.nome = { [Op.like]: `%${nome}%` } : null

            const attributes = ['id', 'nome']
            page ? pagina = Number(page) : null
            limit ? limite = Number(limit) : null
            order ? ordem = String(order).split(',') : null
            const pessoasServices = new PessoasServices()
            const todasAsPessoas = await pessoasServices
                .pegaDocentes({ where, attributes, page: pagina, limit: limite, order: ordem })
            res.json(todasAsPessoas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaPessoasNaoAtivas (req, res, next) {
        const { id, nome, role, page, limit, order } = req.query
        let pagina = 1
        let ordem = null
        let limite = null
        const where = {}

        try {
            const attributes = ['id', 'nome', 'role']
            
            role ? where.role = role : null
            id ? where.id = id : null
            nome ? where.nome = { [Op.like]: `%${nome}%` } : null
            page ? pagina = Number(page) : null
            limit ? limite = Number(limit) : null
            order ? ordem = String(order).split(',') : null
            const pessoasServices = new PessoasServices()
            const todasAsPessoas = await pessoasServices
                .pegaPessoasNAtivas({ where, attributes, page: pagina, limit: limite, order: ordem })
            res.json(todasAsPessoas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaPessoasApagadas (req, res, next) {
        const { role, ativo, page, limit, order } = req.query
        let pagina = 1
        let ordem = null
        let limite = null
        const where = {}

        try {
            const attributes = ['id', 'nome', 'ativo', 'role']

            role ? where.role = role : null
            ativo ? where.ativo = ativo : null
            page ? pagina = Number(page) : null
            limit ? limite = Number(limit) : null
            order ? ordem = String(order).split(',') : null
            const pessoasServices = new PessoasServices()
            const todasAsPessoas = await pessoasServices
                .pegaTodosApagados({ where: where, attributes, page: pagina, limit: limite, order: ordem })
            res.json(todasAsPessoas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmPessoa (req, res, next) {
        const { id } = req.params

        try {
            const pessoasServices = new PessoasServices()
            const umaPessoa = await pessoasServices.pegaUm(Number(id))
            if (umaPessoa === null) {
                throw new Error("Não encontrado!")
            }
            res.json(umaPessoa)
        } catch (error) {
            next(error)
        }
    }

    static async pegaTodasAsTurmasDeUmDocente (req, res, next) {
        const { docenteId } = req.params

        const { data_inicial, data_final, page, limit, order } = req.query
        let pagina = 1
        let ordem = null
        let limite = null
        const where = {}
        where.docente_id = Number(docenteId)

        try {
            const attributes = ['id', 'data_inicio', 'nivel_id', 'docente_id']

            data_inicial || data_final ? where.data_inicio = {} : null
            data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
            data_final ? where.data_inicio[Op.lte] = data_final : null
            page ? pagina = Number(page) : null
            limit ? limite = Number(limit) : null
            order ? ordem = String(order).split(',') : null
            const pessoasServices = new PessoasServices()
            const todasAsTurmasDeUmaPessoa = await pessoasServices
                .pegaTodasAsTurmasDeUmDocente(
                    Number(docenteId), 
                    { where: where, attributes, page: pagina, limit: limite, order: ordem }
                )
            res.json(todasAsTurmasDeUmaPessoa)
        } catch (error) {
            next(error)
        }
    }

    static async pegaTodasAsMatriculasDeUmEstudante (req, res, next) {
        const { estudanteId } = req.params

        const { status, page, limit, order } = req.query
        let pagina = 1
        let ordem = null
        let limite = null
        const where = {}

        try {
            where.estudante_id = Number(estudanteId)

            const attributes = ['id', 'status', 'turma_id', 'estudante_id']

            status ? where.status = status : null
            page ? pagina = Number(page) : null
            limit ? limite = Number(limit) : null
            order ? ordem = order.split(',') : null
            const pessoasServices = new PessoasServices()
            const todasAsMatriculasDeUmEstudante = await pessoasServices
                .pegaTodasAsMatriculasDeUmEstudante(
                    Number(estudanteId),
                    { where: where, attributes, page: pagina, limit: limite, order: ordem }
                    )
            res.json(todasAsMatriculasDeUmEstudante)
        } catch (error) {
            next(error)
        }
    }

    static async cancelaPessoa (req, res, next) {
        const { estudanteId } = req.params

        try {
            const pessoasServices = new PessoasServices()
            await pessoasServices.cancelaPessoaEMatriculas(estudanteId)
            res.json({ mensagem: `matrículas ref. estudante ${estudanteId} canceladas!` })
        } catch (error) {
            next(error)
        }
    }

    static async criaPessoa (req, res, next) {
        const novaPessoa = req.body

        try {
            const pessoasServices = new PessoasServices()
            const novaPessoaCriada = await pessoasServices.cria(novaPessoa)
            res.status(201).json(novaPessoaCriada)
        } catch (error) {
            next(error)
        }
    }

    static async atualizaPessoa (req, res, next) {
        const { id } = req.params
        const novaInfos = req.body

        try {
            const pessoasServices = new PessoasServices()
            const atualizado = await pessoasServices.atualiza(novaInfos, { where: { id: Number(id) } })
            res.json(atualizado)
        } catch (error) {
            next(error)
        }
    }

    static async apagaPessoa (req, res, next) {
        const { id } = req.params

        try {
            const pessoasServices = new PessoasServices()
            await pessoasServices.apaga(Number(id))
            res.json({ messagem: `id ${id} deletado!`})
        } catch (error) {
            next(error)
        }
    }

    static async retauraPessoa (req, res, next) {
        const { id } = req.params

        try {
            const pessoasServices = new PessoasServices()
            await pessoasServices.restaura( Number(id))
            res.json({ mensagem: `id ${id} restaurado`})
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaTurma (req, res, next) {
        const { docenteId, turmaId } = req.params

        try {
            const pessoasServices = new PessoasServices()
            const umaTurma = await pessoasServices.pegaTurma(Number(turmaId), Number(docenteId))
            res.json(umaTurma)
        } catch (error) {
            next(error)
        }
    }

    static async pegaMatriculas (req, res, next) {
        const { status, page, limit, order } = req.params
        const { estudanteId } = req.params
        const where = {}

        try {

            const attributes = ['id', 'status', 'turma_id', 'estudante_id']
            status ? where.status = status : null

            const pessoasServices = new PessoasServices()
            const matriculas = await pessoasServices
                .pegaMatriculas(Number(estudanteId),{ where, attributes, page, limit, order })
            res.json(matriculas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaMatricula (req, res, next) {
        const { estudanteId, matriculaId } = req.params

        try {
            const pessoasServices = new PessoasServices()
            const umaMatricula = await pessoasServices.pegaMatricula(Number(matriculaId), Number(estudanteId))
            res.json(umaMatricula)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PessoasController