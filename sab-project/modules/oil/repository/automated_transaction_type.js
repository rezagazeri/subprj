const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class AutomatedTransactionTypeRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("automatedTransactionTypes"))
    }
}

module.exports = {
    AutomatedTransactionTypeRepository
}
