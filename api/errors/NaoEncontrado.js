
class NaoEncontrado extends Error {
    constructor (msg) {
        super(msg)
        this.name = 'NaoEncontrado'
    }
}

module.exports = NaoEncontrado