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

const adminLevel = 1
const headquarterLevel = 2
const regionLevel = 3
const areaLevel = 4

class HeadquarterService extends BaseService {

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
     * @param {number} headquarterId 
     * @param {User} user
     * @returns {Promise<OilChartStructure>}
     */
    async get(headquarterId, user) {}

    /**
     * 
     * @param {OilChartStructure} headquarter 
     * @param {User} user
     * @returns {Promise<OilChartStructure>}
     */
    async add(headquarter, user) {
        if (user.roleLevel != adminLevel) {
            throw new AccessDeniedError()
        }
        if (headquarter.parentId != undefined || headquarter.parentId != null) {
            throw new ConflictError("parentId should be null")
        }
        headquarter.level = 0
        // headquarter.flagId = 1
        let newHeadquarter = await this.ctx.getOilChartStructureRepository().insert(headquarter)
        if (headquarter.bankAccounts != undefined && headquarter.bankAccounts != null && headquarter.bankAccounts.length != 0) {
            let bankAccounts = await this.ctx.getBankAccountRepository().selectList({
                where: {
                    id: headquarter.bankAccounts
                },
                attributes:["id"]
            })
            await newHeadquarter.setBankAccounts(bankAccounts)
        }
        return newHeadquarter
    }

    /**
     * 
     * @param {OilChartStructure} headquarter 
     * @param {User} user
     * @returns {Promise<OilChartStructure>}
     */
    async edit(headquarter, user) {
        if (user.roleLevel != adminLevel) {
            throw new AccessDeniedError()
        }
        /** @type {OilChartStructure} */
        let refHeadquarter = await this.ctx.getOilChartStructureRepository().selectById(headquarter.id)
        if (refHeadquarter == undefined
            || refHeadquarter == null
            || refHeadquarter.level != 0
        ) {
            throw new ConflictError("there is no headquarter with this headquarterId")
        }
        headquarter.parentId = null
        headquarter.level = 0
        await this.ctx.getOilChartStructureRepository().update(headquarter, {
            where: { id: headquarter.id }
        })
        if (headquarter.bankAccounts != undefined && headquarter.bankAccounts != null) {
            let bankAccounts = await this.ctx.getBankAccountRepository().selectList({
                where: {
                    id: headquarter.bankAccounts
                },
                attributes:["id"]
            })
            await refHeadquarter.setBankAccounts(bankAccounts)
        }
    }

    /**
     * 
     * @param {OilChartStructure} headquarterId 
     * @param {User} user
     * @returns {Promise<void>}
     */
    async drop(headquarterId, user) {
        if (user.roleLevel != adminLevel) {
            throw new AccessDeniedError()
        }
        let refHeadquarter = await this.ctx.getOilChartStructureRepository().selectById(headquarterId)
        if (refHeadquarter == undefined
            || refHeadquarter == null
            || refHeadquarter.level != 0
            || refHeadquarter.flagId == 3
        ) {
            throw new ConflictError("there is no headquarter with this headquarterId")
        }
        await this.ctx.getOilChartStructureRepository().logicalDelete(headquarterId)
    }
}

module.exports = {
    HeadquarterService
}
