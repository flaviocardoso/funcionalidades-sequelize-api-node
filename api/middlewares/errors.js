const { NaoEncontrado, ParametroNaoAceito } = require("../errors")

const opcaoNaoPermitida = [
    'SequelizeUniqueConstraintError', 
    'SequelizeForeignKeyConstraintError', 
    'SequelizeDatabaseError',
    'SequelizeExclusionConstraintError'
]



module.exports = app => {
    app.use((error, req, res, next) => {
        let status = 500
        let mensagem = error.message

        if (opcaoNaoPermitida.indexOf(error.name) !== -1) {
            status = 400
            mensagem = 'Operação não permitida com esses dados.'
        }
        if (error.name === 'SequelizeTimeoutError') {
            mensagem = 'Tempo de execução terminado.'
        }
        if (error.name === 'SequelizeConnectionError' 
            || error.name === 'SequelizeConnectionRefusedError') {
            mensagem = 'Problema com a conexão.'
        }
        if (error.name === 'SequelizeValidationError' 
            || error instanceof ParametroNaoAceito ) {
            status = 400
        }
        if (error instanceof NaoEncontrado ) {
            status = 404
        }

        res.status(status).json({ mensagem })
        next()
    })
}