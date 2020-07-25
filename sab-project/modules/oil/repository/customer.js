const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class CustomerRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("customers"))
        this.repo.belongsTo(ctx.getSequelizeModel("oilChartStructure"), {
            as: "oilChartStructure", foreignKey: "oilChartStructureId", sourceKey: "id"
        })
        this.repo.hasOne(ctx.getSequelizeModel("customerExtraInfo"), {
            as: "extraInfo", foreignKey: "customerId"
        })
        this.repo.belongsToMany(ctx.getSequelizeModel("bankAccounts"), {
            through: ctx.getSequelizeModel("customerBankAccounts"),
            as: "bankAccounts"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("customerTypes"), {
            as: "customerType",
            foreignKey: "customerTypeId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("customerUsageTypes"), {
            as: "usageType",
            foreignKey: "usageTypeId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("customerSupplyChannels"), {
            as: "supplyChannel",
            foreignKey: "supplyChannelId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("customerConcessionaires"), {
            as: "concessionaire",
            foreignKey: "concessionaireId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("customerGroups"), {
            as: "group",
            foreignKey: "groupId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("customerContractors"), {
            as: "contractor",
            foreignKey: "contractorId"
        })
    }
}

module.exports = {
    CustomerRepository
}
