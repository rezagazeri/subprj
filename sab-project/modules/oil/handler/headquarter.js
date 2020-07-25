const express = require("express")
const { Context } = require("../../../context/context")
const { OilChartStructureType } = require("../../../models/oil_chart_structure")
const { AddOilChartStructureValidator } = require("../validator/add_oil_chart_structure")
const { EditOilChartStructureValidator } = require("../validator/edit_oil_chart_structure")
const ResponseService = require('../../../services/ResponseService')
const { UserLevel } = require("../../../models/user")

/**
 * @typedef {import("../../../models/user").User} User 
 */

/**
 * @typedef {import("../../../models/oil_chart_structure").OilChartStructure} OilChartStructure
 */

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res 
 * @param {User} user
 */
async function handleGetList(ctx, req, res, user) {
    let generator = ctx.newOptionsGenerator(req)
    generator.addNotEqual("flagId", 3)
    generator.addEqual("flagId", req.query.flagId)
    generator.addEqual("level", 0)
    generator.addLikes(["name"])
    let { options, pagination } = generator.generateWithPagination()
    options.include = [{
        model: ctx.getBankAccountRepository().repo,
        as: "bankAccounts",
        include: [
            {
                model: ctx.getBankAccountFinancialTypeRepository().repo,
                as: "financialType"
            },
            {
                model: ctx.getBankAccountTypeRepository().repo,
                as: "accountType"
            },
            {
                model: ctx.getBankRepository().repo,
                as: "bank"
            }
        ]
    }]
    options.distinct = true
    switch(user.roleLevel) {
        case UserLevel.HEADQUARTER:
            options.where.id = user.chartStructure.id
            break
        case UserLevel.REGION:
            options.include.push({
                model: ctx.getOilChartStructureRepository().repo,
                as: "regions",
                attributes: [],
                where: {
                    id: user.chartStructure.id
                }
            })
            break
        case UserLevel.AREA:
            options.include.push({
                model: ctx.getOilChartStructureRepository().repo,
                as: "regions",
                attributes: [],
                where: {
                    level: 1
                },
                include: [
                    {
                        model: ctx.getOilChartStructureRepository().repo,
                        as: "areas",
                        attributes: [],
                        where: {
                            id: user.chartStructure.id
                        }
                    }
                ]
            })
            break
    }
    let items = await ctx.getOilChartStructureRepository().selectList(options, pagination)
    new ResponseService(res, req).send(200, { items, pagination })
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res 
 * @param {User} user 
 */
async function handleGet(ctx, req, res, user) {
    let id = req.params.id
    let result = await ctx.getOilChartStructureRepository().
        selectById(id, null, {
            include: [{
                model: ctx.getBankAccountRepository().repo,
                as: "bankAccounts",
                include: [
                    {
                        model: ctx.getBankAccountFinancialTypeRepository().repo,
                        as: "financialType"
                    },
                    {
                        model: ctx.getBankAccountTypeRepository().repo,
                        as: "accountType"
                    },
                    {
                        model: ctx.getBankRepository().repo,
                        as: "bank"
                    }
                ]
            }]
        })
        new ResponseService(res, req).send(200, result)
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res 
 * @param {User} user 
 */
async function handlePost(ctx, req, res, user) {
    await new AddOilChartStructureValidator(OilChartStructureType.Headquarter).validate(req.body)
    if (!req.body.flagId) {
        req.body.flagId = 1
    }
    let headquarter = await ctx.getHeadquarterService().add(req.body, user)
    new ResponseService(res, req).send(201, headquarter)
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res 
 * @param {User} user 
 */
async function handlePatch(ctx, req, res, user) {
    await new EditOilChartStructureValidator(OilChartStructureType.Headquarter).validate(req.body)
    /** @type {OilChartStructure} */ let headquarter = req.body
    headquarter.id = req.params.id
    headquarter = await ctx.getHeadquarterService().edit(headquarter, user)
    new ResponseService(res, req).send(200, {})
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res 
 * @param {User} user 
 */
async function handleDelete(ctx, req, res, user) {
    let headquarterId = req.params.id
    await ctx.getHeadquarterService().drop(headquarterId, user)
    new ResponseService(res, req).send(200, {})
}

module.exports = {
    handleGetList,
    handleGet,
    handlePost,
    handlePatch,
    handleDelete
}
