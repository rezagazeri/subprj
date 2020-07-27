const { BaseError } = require("./error")

/**
 * 
 * @param {Error} err 
 * @returns {BaseError}
 */
function toBaseError(err) {
    let be = new BaseError(501, "UNKNOWN", err.message)
    be.name = err.name
    be.stack = err.stack
    return be
}

module.exports = {
    toBaseError
}
