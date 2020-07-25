const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class BankRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("banks"))
        this.repo.hasOne(ctx.getSequelizeModel("bankAccounts"), {
            as: "bankAccounts", foreignKey: "bankId", sourceKey: "id"
        })
    }
}

module.exports = {
    BankRepository
}
