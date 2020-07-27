const { errorMiddleware } = require("./error_middleware")

/**
 * 
 * @param {function(express.request, express.response, function())} callback 
 * @returns {void}
 */
function asyncWrapper(callback) {
    return async(req, res) => {
        try {
            await callback(req, res)
        } catch(err) {
            errorMiddleware(err, req, res)
        }
    }
}

module.exports = {
    asyncWrapper
}
