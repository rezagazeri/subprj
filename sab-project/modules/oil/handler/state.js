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
    generator.addEqual("countryId", req.query.countryId)
    generator.addLikes(["name"])
    let { options, pagination } = generator.generateWithPagination()
    let items = await ctx.getStateRepository().selectList(options, pagination)
    new ResponseService(res, req).send(200, { items, pagination })
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handleGetById(ctx, req, res) {
    let stateId = req.param("id")
    let state = await ctx.getStateRepository().selectById(stateId)
    new ResponseService(res, req).send(200, state)
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
    let state = req.body
    // state.flagId = 1
    let result = await ctx.getStateRepository().insert(state)
    new ResponseService(res, req).send(201, result)
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handlePatch(ctx, req, res) {
    let state = req.body
    let id = req.param("id")
    let result = await ctx.getStateRepository().update(state, {
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
    await ctx.getStateRepository().logicalDelete(id)
    new ResponseService(res, req).send(200, {})
}

module.exports = {
    handleGetAll,
    handleGetById,
    handlePost,
    handlePatch,
    handleDelete
}
