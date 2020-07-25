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

/**
 * @typedef {Object} Options
 * @property {number} parentId
 * @property {number} flagId
 */

/**
 * 
 */
class AreaService extends BaseService {

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
     * @param {number} areaId 
     * @param {User} user
     * @returns {Promise<OilChartStructure>}
     */
    async get(areaId, user) {}

    /**
     * 
     * @param {OilChartStructure} area 
     * @param {User} user
     * @returns {Promise<OilChartStructure>}
     */
    async add(area, user) {
        if (user.roleLevel != UserLevel.ADMIN
            && user.roleLevel != UserLevel.HEADQUARTER
            && user.roleLevel != UserLevel.REGION
        ) {
            throw new AccessDeniedError()
        }
        /** @type {OilChartStructure} */
        let refRegion = await this.ctx.getOilChartStructureRepository().selectById(area.parentId)
        if (refRegion == undefined
            || refRegion == null
            || refRegion.level != 1
        ) {
            throw new ConflictError("there is no region with this regionId")
        }
        if ((user.roleLevel == UserLevel.HEADQUARTER && refRegion.parentId != user.chartStructure.id) ||
            (user.roleLevel == UserLevel.REGION && refRegion.id != user.chartStructure.id)
        ) {
            throw new AccessDeniedError()
        }
        area.parentId = refRegion.id
        area.level = 2
        // area.flagId = 1
        let newArea = await this.ctx.getOilChartStructureRepository().insert(area)
        if (area.bankAccounts != undefined && area.bankAccounts != null && area.bankAccounts.length != 0) {
            let bankAccounts = await this.ctx.getBankAccountRepository().selectList({
                where: {
                    id: area.bankAccounts
                },
                attributes:["id"]
            })
            await newArea.setBankAccounts(bankAccounts)
        }
        return newArea
    }

    /**
     * 
     * @param {OilChartStructure} area 
     * @param {User} user
     * @returns {Promise<OilChartStructure>}
     */
    async edit(area, user) {
        if (user.roleLevel != UserLevel.ADMIN
            && user.roleLevel != UserLevel.HEADQUARTER
            && user.roleLevel != UserLevel.REGION
        ) {
            throw new AccessDeniedError()
        }
        /** @type {OilChartStructure} */
        let refArea = await this.ctx.getOilChartStructureRepository().selectById(area.id)
        if (refArea == undefined
            || refArea == null
            || refArea.level != 2
        ) {
            throw new ConflictError("there is no area with this areaId")
        }
        switch (user.roleLevel) {
            case UserLevel.HEADQUARTER:
                let refRegion = await this.ctx.getOilChartStructureRepository().selectById(refArea.parentId)
                if (refRegion == undefined
                    || refRegion == null
                    || refRegion.level != 1
                ) {
                    throw new ConflictError("there is no region with this area.parentId")
                }
                if (refRegion.parentId != user.chartStructure.id)
                    throw new AccessDeniedError()
                break
            case UserLevel.REGION:
                if (refArea.parentId != user.chartStructure.id)
                    throw new AccessDeniedError()
                break
        }
        area.parentId = refArea.parentId
        area.level = 2
        await this.ctx.getOilChartStructureRepository().update(area, {
            where: { id: area.id }
        })
        if (area.bankAccounts != undefined && area.bankAccounts != null) {
            let bankAccounts = await this.ctx.getBankAccountRepository().selectList({
                where: {
                    id: area.bankAccounts
                },
                attributes:["id"]
            })
            await refArea.setBankAccounts(bankAccounts)
        }
    }

    /**
     * 
     * @param {number} areaId 
     * @param {User} user
     * @returns {Promise<void>}
     */
    async drop(areaId, user) {
        if (user.roleLevel != UserLevel.ADMIN
            && user.roleLevel != UserLevel.HEADQUARTER
            && user.roleLevel != UserLevel.REGION
        ) {
            throw new AccessDeniedError()
        }
        /** @type {OilChartStructure} */
        let refArea = await this.ctx.getOilChartStructureRepository().selectById(areaId)
        if (refArea == undefined
            || refArea == null
            || refArea.level != 2
            || refArea.flagId == 3
        ) {
            throw new ConflictError("there is no area with this areaId")
        }
        switch (user.roleLevel) {
            case UserLevel.HEADQUARTER:
                let refRegion = await this.ctx.getOilChartStructureRepository().selectById(refArea.parentId)
                if (refRegion == undefined
                    || refRegion == null
                    || refRegion.level != 1
                ) {
                    throw new ConflictError("there is no region with this area.parentId")
                }
                if (refRegion.parentId != user.chartStructure.id)
                    throw new AccessDeniedError()
                break
            case UserLevel.REGION:
                if (refArea.parentId != user.chartStructure.id)
                    throw new AccessDeniedError()
                break
        }
        return await this.ctx.getOilChartStructureRepository().logicalDelete(refArea.id)
    }
}

module.exports = {
    AreaService
}
