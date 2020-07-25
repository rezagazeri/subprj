const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class TransactionTypeRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("transactionTypes"))
        this.repo.belongsTo(ctx.getSequelizeModel("transactionTypeGrades"), {
            as: "grade", foreignKey: "transactionTypeGradeId", sourceKey: "id"
        })
    }
}

module.exports = {
    TransactionTypeRepository
}
