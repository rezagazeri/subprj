const { Context } = require("../../../context/context")
const { BaseService } = require("../../../utils/base_service")

class TransactionTypeService extends BaseService {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx)
    }
}

module.exports = {
    TransactionTypeService
}
