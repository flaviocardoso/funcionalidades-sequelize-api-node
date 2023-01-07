const { Router } = require('express')
const NiveisController = require('../controllers/niveis')

const NiveisRouter = Router()

NiveisRouter
    .options('/niveis', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET,POST')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/niveis', NiveisController.pegaTodasAsNiveis) // ok
    .post('/niveis', NiveisController.criaNivel) // ok
    .options('/niveis/apagadas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/niveis/apagadas', NiveisController.pegaNiveisApagados) // ok
    .options('/niveis/:id', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/niveis/:id', NiveisController.pegaUmNivel) // ok
    .put('/niveis/:id', NiveisController.atualizaNivel) // ok
    .delete('/niveis/:id', NiveisController.apagaNivel) // ok
    .options('/niveis/:id/restaura', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'POST')
        res.header('Access-Control-Allow-Headers', 'Content_Type')
        res.status(204).end()
    })
    .post('/niveis/:id/restaura', NiveisController.restauraNivel) 
    .options('/niveis/:nivelId/turmas', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.status(204).end()
    })
    .get('/niveis/:nivelId/turmas', NiveisController.pegaTodasAsTurmasDeUmNivel) // ok
    .options('/niveis/:nivelId/turmas/:turmaId', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET')
        res.header('Access-Control-Allow-Heades', 'Content-Type')
        res.status(204).end()
    })
    .get('/niveis/:nivelId/turmas/:turmaId', NiveisController.pegaUmaTurma) // ok

module.exports = NiveisRouter