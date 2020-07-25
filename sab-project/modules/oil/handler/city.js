const express = require("express")
const { Context } = require("../../../context/context")
const { Sequelize } = require("sequelize")
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
    generator.addEqual("stateId", req.query.stateId)
    generator.addLikes(["name"])
    let { options, pagination } = generator.generateWithPagination()
    options.include = [
        {
            model: ctx.getStateRepository().repo,
            as: "state"
        }
    ]
    let items = await ctx.getCityRepository().selectList(options, pagination)
    new ResponseService(res, req).send(200, { items, pagination })
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handleGetById(ctx, req, res) {
    let cityId = req.param("id")
    let city = await ctx.getCityRepository().selectById(cityId, null, {
        include: [
            {
                model: ctx.getStateRepository().repo,
                as: "state"
            }
        ]
    })
    new ResponseService(res, req).send(200, city)
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
    let city = req.body
    let result = await ctx.getCityRepository().insert(city)
    new ResponseService(res, req).send(201, result)
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handlePatch(ctx, req, res) {
    let city = req.body
    let id = req.param("id")
    let result = await ctx.getCityRepository().update(city, {
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
    await ctx.getCityRepository().logicalDelete(id)
    new ResponseService(res, req).send(200, {})
}

module.exports = {
    handleGetAll,
    handleGetById,
    handlePost,
    handlePatch,
    handleDelete
}
