const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class StateRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("states"))
        this.repo.hasMany(ctx.getSequelizeModel("cities"), {
            as: "cities", foreignKey: "stateId", sourceKey: "id"
        })
    }
}

module.exports = {
    StateRepository
}
