const { Context } = require("../../../context/context")
const { BaseService } = require("../../../utils/base_service")

class UserService extends BaseService {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx)
    }
}

module.exports = {
    UserService
}
