
class ParametroNaoAceito extends Error {
    constructor(msg) {
        super(msg)
        this.name = 'ParametroNaoAceito'
    }
}

module.exports = ParametroNaoAceito