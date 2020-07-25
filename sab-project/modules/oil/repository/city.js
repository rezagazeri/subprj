const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class CityRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("cities"))
        this.repo.belongsTo(ctx.getSequelizeModel("states"), {
            as: "state", foreignKey: "stateId", sourceKey: "id"
        })
    }
}

module.exports = {
    CityRepository
}
