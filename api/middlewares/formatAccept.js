
module.exports = app => {
    app.use((req, res, next) => {
        let formatAccept = req.header('Accept')

        if (formatAccept === '*/*') {
            formatAccept = 'application/json'
        }

        if ('application/json' !== formatAccept) {
            res.status(406).end()
            return
        }
        
        res.setHeader('Content-Type', formatAccept)
        next()
    })
}