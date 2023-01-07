const { Router } = require('express')
const MatriculasController = require('../controllers/matriculas')

const MatriculasRouter = Router()

MatriculasRouter
    .options('/turmas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET,POST')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/matriculas', MatriculasController.pegaTodasAsMatriculas) // todas as matriculas
    .post('/matriculas', MatriculasController.criaMatricula) // cria uma matricula
    .options('/matriculas/confirmadas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/matriculas/confirmadas', MatriculasController.pegaMatriculasConfirmadas) // todas as matriculas
    .options('/matriculas/confirmadas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/matriculas/confirmadas', MatriculasController.pegaMatriculasCanceladas) // todas as matriculas
    .options('/matriculas/apagadas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/matriculas/apagadas', MatriculasController.pegaMatriculasApagadas) // todas as matriculas
    .options('/matriculas/:id', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/matriculas/:id', MatriculasController.pegaUmaMatricula) // pega uma matricula
    .put('/matriculas/:id', MatriculasController.atualizaMatricula)
    .delete('/matriculas/:id', MatriculasController.apagaMatricula)
    .options('/matriculas/:id/restatura', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'POST')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .post('/matriculas/:id/restatura', MatriculasController.restauraMatricula)

module.exports = MatriculasRouter