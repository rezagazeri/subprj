const { Model } = require("sequelize")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class TransactionRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("transactions"))
        this.repo.belongsTo(ctx.getSequelizeModel("transactionMedias"), {
            as: "media",
            foreignKey: "transactionMediaTypeId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("transactionMethods"), {
            as: "method",
            foreignKey: "transactionMethodId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("transactionSituations"), {
            as: "situation",
            foreignKey: "transactionSituationId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("transactionSources"), {
            as: "source",
            foreignKey: "sourceId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("transactionTypes"), {
            as: "type",
            foreignKey: "transactionTypeId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("customers"), {
            as: "customer",
            foreignKey: "customerId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("bankAccounts"), {
            as: "bankAccount",
            foreignKey: "bankAccountId"
        })
    }
}

module.exports = {
    TransactionRepository
}
