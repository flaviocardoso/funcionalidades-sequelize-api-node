const { Router } = require('express')
const TurmasController = require('../controllers/turmas')

const TurmasRouter = Router()

TurmasRouter
    .options('/turmas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET,POST')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/turmas', TurmasController.pegaTodasAsTurmas) // ok
    .post('/turmas', TurmasController.criaTurma) // ok
    .options('/turmas/apagadas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/turmas/apagadas', TurmasController.pegaTurmasApagadas) // ok
    .options('/turmas/lotadas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/turmas/lotadas', TurmasController.pegaTurmasLotadas) // ok
    .options('/turmas/:id', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/turmas/:id', TurmasController.pegaUmaTurma) // ok
    .put('/turmas/:id', TurmasController.atualizaTurma) // ok
    .delete('/turmas/:id', TurmasController.apagaTurma) //ok
    .options('/turmas/:id/restaura', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'POST')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .post('/turmas/:id/restaura', TurmasController.restauraTurma) //ok
    .options('/turmas/:turmaId/matriculas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('access-Control-Allow-Headers', 'Content-type')
        res.status(204).end()
    })
    .get('/turmas/:turmaId/matriculas', TurmasController.pegaTodasAsMatriculasDeUmaTurma) // todas as matriculas - estudante ok
    .options('/turmas/:turmaId/matriculas/:matriculaId', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('access-Control-Allow-Headers', 'Content-type')
        res.status(204).end()
    })
    .get('/turmas/:turmaId/matriculas/:matriculaId', TurmasController.pegaUmaMatricula) // todas as matriculas - estudante ok

module.exports = TurmasRouter