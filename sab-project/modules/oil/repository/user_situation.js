const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * 
 */
class UserSituationRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("userSituations"))
    }
}

module.exports = {
    UserSituationRepository
}
