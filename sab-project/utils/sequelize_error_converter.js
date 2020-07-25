const { BaseError } = require("../models/error")

/**
 * 
 */
class SequelizeErrorConverter {

    /**
     * 
     */
    constructor() {
        this.err
    }

    /**
     * 
     * @param {Error} err 
     * @returns {BaseError}
     */
    convert(err) {
        return new BaseError(500, "SequelizeError", err.message)
    }
}

module.exports = {
    SequelizeErrorConverter
}
