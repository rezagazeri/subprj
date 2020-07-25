const { Context } = require("../../../context/context")
const { BaseService } = require("../../../utils/base_service")

class BankAccountService extends BaseService {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx)
    }
}

module.exports = {
    BankAccountService
}
