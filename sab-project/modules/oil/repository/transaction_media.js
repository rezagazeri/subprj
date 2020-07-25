const { Model } = require("sequelize")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class TransactionMediaRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("transactionMedias"))
    }
}

module.exports = {
    TransactionMediaRepository
}
