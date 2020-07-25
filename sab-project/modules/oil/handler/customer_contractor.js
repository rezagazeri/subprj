const express = require("express")
const { Context } = require("../../../context/context")
const { ConflictError } = require("../../../models/error")
const ResponseService = require('../../../services/ResponseService')

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handleGetAll(ctx, req, res) {
    let generator = ctx.newOptionsGenerator(req)
    generator.addNotEqual("flagId", 3)
    generator.addEqual("flagId", req.query.flagId)
    generator.addLikes(["customerName"])
    let { options, pagination } = generator.generateWithPagination()
    options.distinct = true
    options.include = [{
        model: ctx.getOilChartStructureRepository().repo,
        as: "oilChartStructure"
    },{
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
    let items = await ctx.getCustomerContractorRepository().selectList(options, pagination)
    new ResponseService(res, req).send(200, { items, pagination })
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handleGetById(ctx, req, res) {
    let id = req.params.id
    let result = await ctx.getCustomerContractorRepository().selectById(id, null, {
        include: [{
            model: ctx.getOilChartStructureRepository().repo,
            as: "oilChartStructure"
        },{
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
 */
async function handlePost(ctx, req, res) {
    if (!req.body.flagId) {
        req.body.flagId = 1
    }
    let customer = req.body
    let result = await ctx.getCustomerContractorRepository().insert(customer)
    if (customer.bankAccountIds != undefined && customer.bankAccountIds != null && customer.bankAccountIds.length != 0) {
        let bankAccounts = await ctx.getBankAccountRepository().selectList({
            where: {
                id: customer.bankAccountIds
            },
            attributes:["id"]
        })
        await result.setBankAccounts(bankAccounts)
    }
    new ResponseService(res, req).send(201, result)
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handlePatch(ctx, req, res) {
    let contractor = req.body
    let id = req.params.id
    let refContractor = await ctx.getCustomerContractorRepository().selectById(id)
    if (refContractor == undefined || refContractor == null) {
        throw new ConflictError("there is no contractor with this contractorId")
    }
    let result = await ctx.getCustomerContractorRepository().update(contractor, {
        where: { id }
    })
    if (contractor.bankAccountIds != undefined && contractor.bankAccountIds != null && contractor.bankAccountIds.length != 0) {
        let bankAccounts = await ctx.getBankAccountRepository().selectList({
            where: {
                id: contractor.bankAccountIds
            },
            attributes:["id"]
        })
        await refContractor.setBankAccounts(bankAccounts)
    }
    new ResponseService(res, req).send(200, {})
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handleDelete(ctx, req, res) {
    let id = req.params.id
    await ctx.getCustomerContractorRepository().logicalDelete(id)
    new ResponseService(res, req).send(200, {})
}

module.exports = {
    handleGetAll,
    handleGetById,
    handlePost,
    handlePatch,
    handleDelete
}
