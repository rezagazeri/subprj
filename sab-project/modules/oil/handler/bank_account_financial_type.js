const express = require("express")
const { Context } = require("../../../context/context")
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
    generator.addLikes(["name"])
    let { options, pagination } = generator.generateWithPagination()
    let items = await ctx.getBankAccountFinancialTypeRepository().selectList(options, pagination)
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
    let result = await ctx.getBankAccountFinancialTypeRepository().selectById(id)
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
    let bankAccountTransactionType = req.body
    let result = await ctx.getBankAccountFinancialTypeRepository().insert(bankAccountTransactionType)
    new ResponseService(res, req).send(201, result)
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handlePatch(ctx, req, res) {
    let bankAccountTransactionType = req.body
    let id = req.param("id")
    let result = await ctx.getBankAccountFinancialTypeRepository().update(bankAccountTransactionType, {
        where: { id }
    })
    new ResponseService(res, req).send(200, {})
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handleDelete(ctx, req, res) {
    let id = req.param("id")
    await ctx.getBankAccountFinancialTypeRepository().logicalDelete(id)
    new ResponseService(res, req).send(200, {})
}

module.exports = {
    handleGetAll,
    handleGetById,
    handlePost,
    handlePatch,
    handleDelete
}
