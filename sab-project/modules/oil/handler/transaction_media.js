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
    let items = await ctx.getTransactionMediaRepository().selectList(options, pagination)
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
    let result = await ctx.getTransactionMediaRepository().selectById(id)
    new ResponseService(res, req).send(200, result)
}

module.exports = {
    handleGetAll,
    handleGetById
}
