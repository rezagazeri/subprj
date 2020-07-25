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
    let items = await ctx.getCustomerGroupRepository().selectList(options, pagination)
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
    let result = await ctx.getCustomerGroupRepository().selectById(id)
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
    let customerGroup = req.body
    let result = await ctx.getCustomerGroupRepository().insert(customerGroup)
    new ResponseService(res, req).send(201, result)
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handlePatch(ctx, req, res) {
    let customerGroup = req.body
    let id = req.param("id")
    let result = await ctx.getCustomerGroupRepository().update(customerGroup, {
        where: { id }
    })
    new ResponseService(res, req).send(201, {})
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handleDelete(ctx, req, res) {
    let id = req.param("id")
    await ctx.getCustomerGroupRepository().logicalDelete(id)
    new ResponseService(res, req).send(200, {})
}

module.exports = {
    handleGetAll,
    handleGetById,
    handlePost,
    handlePatch,
    handleDelete
}
