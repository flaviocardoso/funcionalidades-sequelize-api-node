const express = require('express')
const app = express()
const port = 3000
const routes = require('./router')
const errors = require('./middlewares/errors')
// rotas
routes(app)
// middlewares depois
errors(app)

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}!`))
