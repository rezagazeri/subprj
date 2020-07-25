const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class TransactionMethodRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("transactionMethods"))
    }
}

module.exports = {
    TransactionMethodRepository
}
