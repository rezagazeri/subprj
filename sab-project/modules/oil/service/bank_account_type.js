const { Context } = require("../../../context/context")
const { BaseService } = require("../../../utils/base_service")

class BankAccountTypeService extends BaseService {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx)
    }
}

module.exports = {
    BankAccountTypeService
}
