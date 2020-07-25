const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class CustomerContractorRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("customerContractors"))
        this.repo.belongsTo(ctx.getSequelizeModel("oilChartStructure"), {
            as: "oilChartStructure", foreignKey: "oilChartStructureId", sourceKey: "id"
        })
        this.repo.belongsToMany(ctx.getSequelizeModel("bankAccounts"), {
            through: ctx.getSequelizeModel("customerContractorBankAccounts"),
            as: "bankAccounts"
        })
    }
}

module.exports = {
    CustomerContractorRepository
}
