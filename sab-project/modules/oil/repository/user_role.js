const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class UserRoleRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("userRoles"))
        this.repo.belongsTo(ctx.getSequelizeModel("oilChartStructure"), {
            as: "oilChartStructure",
            foreignKey: "oilChartStructureId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("roleList"), {
            as: "roleList",
            foreignKey: "roleId"
        })

    }
}

module.exports = {
    UserRoleRepository
}
