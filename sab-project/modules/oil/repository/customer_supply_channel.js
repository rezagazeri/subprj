const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class CustomerSupplyChannelRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("customerSupplyChannels"))
    }
}

module.exports = {
    CustomerSupplyChannelRepository
}
