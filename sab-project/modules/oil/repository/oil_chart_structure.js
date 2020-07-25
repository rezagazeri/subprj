const { Context } = require("../../../context/context")
const { BaseRepository } = require("../../../utils/base_repository")

/**
 * @typedef {Object} Options
 * @property {number} parentId
 * @property {number} level
 * @property {number} flagId
 */

/**
 * 
 */
class OilChartStructureRepository extends BaseRepository {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx.getSequelizeModel("oilChartStructure"))
        this.repo.hasMany(this.repo, {
            as: "regions", foreignKey: "parentId", sourceKey: "id"
        })
        this.repo.hasMany(this.repo, {
            as: "areas", foreignKey: "parentId", sourceKey: "id"
        })
        this.repo.belongsTo(this.repo, {
            as: "headquarter", foreignKey: "parentId", sourceKey: "id"
        })
        this.repo.belongsTo(this.repo, {
            as: "region", foreignKey: "parentId", sourceKey: "id"
        })
        this.repo.belongsTo(this.repo, {
            as: "parent", foreignKey: "parentId", sourceKey: "id"
        })
        this.repo.belongsToMany(ctx.getSequelizeModel("bankAccounts"), {
            through: ctx.getSequelizeModel("oilChartStructureBankAccounts"),
            as: "bankAccounts"
        })
    }

    /**
     * 
     * @param {Options} options 
     */
    async getList(options) {}
}

module.exports = {
    OilChartStructureRepository
}
