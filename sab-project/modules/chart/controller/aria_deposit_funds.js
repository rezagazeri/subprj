/**
 * Chart module
 * Add by voltan, Avin co
 */

const express = require("express")
const {Context} = require("../../../context/context")
const {Op} = require("sequelize")
const ResponseService = require('../../../services/ResponseService')

/**
 *
 * @param {Context} ctx
 * @param {express.request} req
 * @param {express.response} res
 */
module.exports = {
    getChart: async (ctx, req, res, user) => {

        // Set child arrays
        let chart = {}
        let oilChartStructureId = parseInt(req.query.oilChartStructureId)
        let oilChartStructureIdListId = []
        let oilChartStructureIdListFull = {}
        let transactionTypesId = []

        if (oilChartStructureId > 0) {

            // Select increase transactiontypes id
            let transactionTypes = await ctx.getTransactionTypeRepository().selectList({
                where: {
                    effect: 'increase',
                    flagId: 1
                }
            })

            // Push to array and object
            transactionTypes.forEach(transactionType => {
                transactionTypesId.push(transactionType.id)
            })

            // Select child
            let itemsOil = await ctx.getOilChartStructureRepository().selectList({
                where: {
                    parentId: oilChartStructureId
                }
            })

            // Push to array and object
            itemsOil.forEach(itemOil => {
                oilChartStructureIdListId.push(itemOil.id)
                oilChartStructureIdListFull[itemOil.id] = {
                    'name': itemOil.name,
                    'count': 0,
                    'value': 0,
                }
            })

            // Check array not empty
            if (oilChartStructureIdListId.length > 0) {

                // Set generator
                let generator = ctx.newOptionsGenerator(req)
                let options = generator.generateWithPagination()
                options.include = []
                options.where =  {}
                options.where.transactionTypeId= {
                    [Op.in]: transactionTypesId
                }

                // Set join to customer table
                let customerOption = {
                    model: ctx.getCustomerRepository().repo,
                    as: "customer",
                    required: true,
                    where: {},
                }
                customerOption.where.oilChartStructureId = {
                    [Op.in]: oilChartStructureIdListId
                },
                    options.include.push(customerOption)

                // Do select query
                let items = await ctx.getTransactionRepository().selectList(options)

                // Canonize
                items.forEach(item => {
                    let key = item.customer.oilChartStructureId
                    oilChartStructureIdListFull[key].count = oilChartStructureIdListFull[key].count + 1
                    oilChartStructureIdListFull[key].value = oilChartStructureIdListFull[key].value + item.amount
                })

                // Set result to chart as value
                chart = Object.values(oilChartStructureIdListFull)
            }
        }

        new ResponseService(res, req).send(200, {chart})
    }
}