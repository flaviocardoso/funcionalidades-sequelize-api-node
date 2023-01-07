
module.exports = app => {
    app.use((req, res, next) => { 
        res.set('x-powered-by', 'Flavio Cardoso') // dando nome a API
        next()
    })
}