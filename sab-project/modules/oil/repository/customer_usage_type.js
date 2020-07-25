const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class CustomerUsageTypeRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("customerUsageTypes"))
    }
}

module.exports = {
    CustomerUsageTypeRepository
}
