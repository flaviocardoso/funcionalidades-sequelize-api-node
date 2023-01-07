
module.exports = app => {
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*') // CORS, aqui permite a todos ao acesso a API
        next()
    })
}