const express = require('express')

// config
const powered = require('../middlewares/powered')
const cors = require('../middlewares/cors')
const formatAccept = require('../middlewares/formatAccept')

const PessoasRouter = require('./pessoas')
const NiveisRouter = require('./niveis')
const TurmasRouter = require('./turmas')
const MatriculasRouter = require('./matriculas')


module.exports = app => {
    powered(app)
    cors(app)
    formatAccept(app)

    app.use(express.json())

    app.use('/api', PessoasRouter)
    app.use('/api', NiveisRouter)
    app.use('/api', TurmasRouter)
    app.use('/api', MatriculasRouter)
}