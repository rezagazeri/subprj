const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class BankAccountFinancialTypeRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("bankAccountFinancialTypes"))
        this.repo.hasOne(ctx.getSequelizeModel("bankAccounts"), {
            as: "bankAccounts", foreignKey: "financialTypeId", sourceKey: "id"
        })
    }
}

module.exports = {
    BankAccountFinancialTypeRepository
}
