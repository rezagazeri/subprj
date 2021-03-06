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
    generator.addEqual("parentId", req.query.parentId)
    generator.addEqual("level", 1)
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
    }, {
        model: ctx.getOilChartStructureRepository().repo,
        as: "parent"
    }]
    options.distinct = true
    switch(user.roleLevel) {
        case UserLevel.HEADQUARTER:
            options.where.parentId = user.chartStructure.id
            break
        case UserLevel.REGION:
            options.where.id = user.chartStructure.id
            break
        case UserLevel.AREA:
            options.include.push({
                model: ctx.getOilChartStructureRepository().repo,
                as: "areas",
                attributes: [],
                where: {
                    id: user.chartStructure.id
                }
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
            }, {
                model: ctx.getOilChartStructureRepository().repo,
                as: "parent"
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
    await new AddOilChartStructureValidator(OilChartStructureType.Region).validate(req.body)
    if (!req.body.flagId) {
        req.body.flagId = 1
    }
    let region = await ctx.getRegionService().add(req.body, user)
    new ResponseService(res, req).send(201, region)
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res 
 * @param {User} user 
 */
async function handlePatch(ctx, req, res, user) {
    await new EditOilChartStructureValidator(OilChartStructureType.Region).validate(req.body)
    let region = req.body
    region.id = req.params.id
    region = await ctx.getRegionService().edit(region, user)
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
    let regionId = req.params.id
    await ctx.getRegionService().drop(regionId, user)
    new ResponseService(res, req).send(200, {})
}

module.exports = {
    handleGetList,
    handleGet,
    handlePost,
    handlePatch,
    handleDelete
}
