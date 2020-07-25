const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class UserRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("userList"))
        this.repo.belongsTo(ctx.getSequelizeModel("userGenders"), {
            as: "gender",
            foreignKey: "genderId"
        })
        this.repo.belongsTo(ctx.getSequelizeModel("userSituations"), {
            as: "situations",
            foreignKey: "situationId"
        })
        this.repo.hasOne(ctx.getSequelizeModel("userRoles"), {
            as: "userRoles",
            foreignKey: "userId"
        })

    }
}

module.exports = {
    UserRepository
}
