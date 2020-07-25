const { Context } = require("../context/context")

/**
 * 
 */
class BaseService {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        this.ctx = ctx
    }
}

module.exports = {
    BaseService
}
