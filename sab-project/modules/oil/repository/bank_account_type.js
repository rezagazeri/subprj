const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class BankAccountTypeRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("bankAccountTypes"))
        this.repo.hasOne(ctx.getSequelizeModel("bankAccounts"), {
            as: "bankAccounts", foreignKey: "accountTypeId", sourceKey: "id"
        })
    }

}

module.exports = {
    BankAccountTypeRepository
}
