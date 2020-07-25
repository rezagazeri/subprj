const { Context } = require("../../../context/context")
const { BaseService } = require("../../../utils/base_service")
const { AccessDeniedError, ConflictError } = require("../../../models/error")
const { UserLevel } = require("../../../models/user")

/**
 * @typedef {import("../../../models/user").User} User
 */

/**
 * @typedef {import("../../../models/oil_chart_structure").OilChartStructure} OilChartStructure
 */

/**
 * @typedef {import("../../../models/options").Options} Options
 */

class RegionService extends BaseService {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx)
    }

    /**
     * 
     * @param {Options} options 
     * @param {User} user
     * @returns {Promise<{items:OilChartStructure[],pagination:Pagination}>}
     */
    async getList(options, user) {}

    /**
     * 
     * @param {number} regionId 
     * @param {User} user
     * @returns {Promise<OilChartStructure>}
     */
    async get(regionId, user) {}

    /**
     * 
     * @param {OilChartStructure} region 
     * @param {User} user
     * @returns {Promise<OilChartStructure>}
     */
    async add(region, user) {
        if (user.roleLevel != UserLevel.ADMIN && user.roleLevel != UserLevel.HEADQUARTER) {
            throw new AccessDeniedError()
        }
        if (user.roleLevel == UserLevel.HEADQUARTER && region.parentId != user.chartStructure.id) {
            throw new AccessDeniedError()
        }
        /** @type {OilChartStructure} */
        let refHeadquarter = await this.ctx.getOilChartStructureRepository().selectById(region.parentId)
        if (refHeadquarter == undefined
            || refHeadquarter == null
            || refHeadquarter.level != 0
        ) {
            throw new ConflictError("there is no headquarter with this headquarterId")
        }
        region.level = 1
        // region.flagId = 1
        let newRegion = await this.ctx.getOilChartStructureRepository().insert(region)
        if (region.bankAccounts != undefined && region.bankAccounts != null && region.bankAccounts.length != 0) {
            let bankAccounts = await this.ctx.getBankAccountRepository().selectList({
                where: {
                    id: region.bankAccounts
                },
                attributes:["id"]
            })
            await newRegion.setBankAccounts(bankAccounts)
        }
        return newRegion
    }

    /**
     * 
     * @param {OilChartStructure} region 
     * @param {User} user
     * @returns {Promise<OilChartStructure>}
     */
    async edit(region, user) {
        if (user.roleLevel != UserLevel.ADMIN && user.roleLevel != UserLevel.HEADQUARTER) {
            throw new AccessDeniedError()
        }
        let refRegion = await this.ctx.getOilChartStructureRepository().selectById(region.id)
        if (refRegion == undefined
            || refRegion == null
            || refRegion.level != 1
        ) {
            throw new ConflictError("there is no region with this regionId")
        }
        if (user.roleLevel == UserLevel.HEADQUARTER &&
            (refRegion.parentId != user.chartStructure.id || refRegion.parentId != region.parentId)) {
            throw new AccessDeniedError()
        }
        region.level = 1
        await this.ctx.getOilChartStructureRepository().update(region, {
            where: { id: region.id }
        })
        if (region.bankAccounts != undefined && region.bankAccounts != null) {
            let bankAccounts = await this.ctx.getBankAccountRepository().selectList({
                where: {
                    id: region.bankAccounts
                },
                attributes:["id"]
            })
            await refRegion.setBankAccounts(bankAccounts)
        }
    }

    /**
     * 
     * @param {number} regionId 
     * @param {User} user
     * @returns {Promise<void>}
     */
    async drop(regionId, user) {
        if (user.roleLevel != UserLevel.ADMIN && user.roleLevel != UserLevel.HEADQUARTER) {
            throw new AccessDeniedError()
        }
        let refRegion = await this.ctx.getOilChartStructureRepository().selectById(regionId)
        if (refRegion == undefined
            || refRegion == null
            || refRegion.level != 1
            || refRegion.flagId == 3
        ) {
            throw new ConflictError("there is no region with this regionId")
        }
        if (user.roleLevel == UserLevel.HEADQUARTER && refRegion.parentId != user.chartStructure.id) {
            throw new AccessDeniedError()
        }
        await this.ctx.getOilChartStructureRepository().logicalDelete(regionId)
    }
}

module.exports = {
    RegionService
}
