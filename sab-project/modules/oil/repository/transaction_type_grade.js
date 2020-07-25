const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class TransactionTypeGradeRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("transactionTypeGrades"))
    }
}

module.exports = {
    TransactionTypeGradeRepository
}
