const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class CustomerExtraInfoRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("customerExtraInfo"))
        this.repo.belongsTo(ctx.getSequelizeModel("customers"), {
            as: "customer", foreignKey: "customerId"
        })
    }
}

module.exports = {
    CustomerExtraInfoRepository
}
