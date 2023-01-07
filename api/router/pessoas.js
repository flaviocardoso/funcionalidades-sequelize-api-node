const { Router } = require('express')
const PessoasController = require('../controllers/pessoas')

const PessoasRouter = Router()

PessoasRouter
    .options('/pessoas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET,POST')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/pessoas', PessoasController.pegaTodasAsPessoas) // ok
    .post('/pessoas', PessoasController.criaPessoa) // ok
    .options('/pessoas/ativas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/pessoas/ativas', PessoasController.pegaPessoasAtivas)
    .options('/pessoas/estudantes', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/pessoas/estudantes', PessoasController.pegaEstudantes)
    .options('/pessoas/docentes', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/pessoas/docentes', PessoasController.pegaDocentes)
    .options('/pessoas/naoativas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/pessoas/naoativas', PessoasController.pegaPessoasNaoAtivas)
    .options('/pessoas/apagadas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/pessoas/apagadas', PessoasController.pegaPessoasApagadas)
    .options('/pessoas/:id', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/pessoas/:id', PessoasController.pegaUmPessoa) // ok
    .put('/pessoas/:id', PessoasController.atualizaPessoa) // ok
    .delete('/pessoas/:id', PessoasController.apagaPessoa) // ok
    .options('/pessoas/:id/restaura', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'POST')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .post('/pessoas/:id/restaura', PessoasController.retauraPessoa) // ok
    .options('/pessoas/:estudanteId/cancela', (req, res) => {
        res.header('Access-Control-Allow-Headers', 'POST')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
    })
    .post('/pessoas/:estudanteId/cancela', PessoasController.cancelaPessoa) // ok
    .options('/pessoas/:docenteId/turmas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/pessoas/:docenteId/turmas', PessoasController.pegaTodasAsTurmasDeUmDocente) // ok
    .options('/pessoas/:docenteId/turmas/:turmaId', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/pessoas/:docenteId/turmas/:turmaId', PessoasController.pegaUmaTurma) // ok
    .options('/pessoas/:estudanteId/matriculas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/pessoas/:estudanteId/matriculas', PessoasController.pegaMatriculas) // ok
    .options('/pessoas/:estudanteId/matriculas/:matriculaId', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoasController.pegaUmaMatricula) // ok

module.exports = PessoasRouter
