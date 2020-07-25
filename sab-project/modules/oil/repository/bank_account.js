const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class BankAccountRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("bankAccounts"))
        this.repo.belongsToMany(ctx.getSequelizeModel("oilChartStructure"), {
            through: ctx.getSequelizeModel("oilChartStructureBankAccounts"),
            as: "chartStructures"
        })
        this.repo.belongsToMany(ctx.getSequelizeModel("customerContractors"), {
            through: ctx.getSequelizeModel("customerContractorBankAccounts"),
            as: "customerContractorsBankAccounts"
        })
        this.repo.belongsToMany(ctx.getSequelizeModel("bankAccounts"), {
            through: ctx.getSequelizeModel("customerBankAccounts"),
            as: "bankAccounts"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("bankAccountFinancialTypes"), {
            as: "financialType"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("bankAccountTypes"), {
            as: "accountType"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("banks"), {
            as: "bank", foreignKey: "bankId", sourceKey: "id"
        })
    }
}

module.exports = {
    BankAccountRepository
}
