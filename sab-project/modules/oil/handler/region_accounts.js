const express = require("express")
const { Context } = require("../../../context/context")
const { OilChartStructureType } = require("../../../models/oil_chart_structure")
const ResponseService = require('../../../services/ResponseService')
const { UserLevel } = require("../../../models/user")
const { Sequelize, Op } = require("sequelize")
const {areaList, regionList, makeid} =require("./template");
const execSync = require('child_process').execSync;
const fs = require('fs')

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
    //generator.addEqual("parentId", req.query.parentId)
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
    options.where.level = 1
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
    if (req.query.fileType===null || (req.query.fileType!=="pdf" && req.query.fileType!=="docx"))
    {
        let items = await ctx.getOilChartStructureRepository().selectList(options, pagination)
        items = JSON.parse(JSON.stringify(items))
        for (let i in items){
            //items[i].bankAccounts = items[i].bankAccounts.length;
            let secondTable = await ctx.getCustomerRepository().selectList({
                attributes: [
                    'oilChartStructure.id'
                    //, [Sequelize.fn('COUNT',  Sequelize.col('*')), 'flagId']
                ],
                include:[
                    {
                        model:ctx.getOilChartStructureRepository().repo,
                        as: "oilChartStructure"
                    }]
                ,
                where:{[Op.or]: [{'$oilChartStructure.id$':items[i].id},{'$oilChartStructure.parent_id$':items[i].id},]},
                //group: ['oilChartStructure.id']
            })
            //console.log(JSON.parse(JSON.stringify(items[i])))
            //console.log({[Op.or]: [{'$oilChartStructure.id$':items[i].id},{'$oilChartStructure.parent_id$':items[i].id},]})
            secondTable = JSON.parse(JSON.stringify(secondTable))
            //console.log(secondTable)
            if(secondTable.length)
                items[i].customerCount = secondTable.length
            else
                items[i].customerCount=0
        }
        new ResponseService(res, req).send(200, { items, pagination })

    }else{
        let items = await ctx.getOilChartStructureRepository().selectList(options, pagination)
        items = JSON.parse(JSON.stringify(items))
        for (let i in items){
            //items[i].bankAccounts = items[i].bankAccounts.length;
            let secondTable = await ctx.getCustomerRepository().selectList({
                attributes: [
                    'oilChartStructure.id'
                    //, [Sequelize.fn('COUNT',  Sequelize.col('*')), 'flagId']
                ],
                include:[
                    {
                        model:ctx.getOilChartStructureRepository().repo,
                        as: "oilChartStructure"
                    }]
                ,
                where:{[Op.or]: [{'$oilChartStructure.id$':items[i].id},{'$oilChartStructure.parent_id$':items[i].id},]},
                //group: ['oilChartStructure.id']
            })
            //console.log(JSON.parse(JSON.stringify(items[i])))
            //console.log({[Op.or]: [{'$oilChartStructure.id$':items[i].id},{'$oilChartStructure.parent_id$':items[i].id},]})
            secondTable = JSON.parse(JSON.stringify(secondTable))
            //console.log(secondTable)
            if(secondTable.length)
                items[i].customerCount = secondTable.length
            else
                items[i].customerCount=0
        }
        let content = await regionList({
            "report_title":"لیست حسابها",
            "items":JSON.parse(JSON.stringify(items))})
        let fileName = makeid(12)
        let fileNameLoc = common.getConfig().file.location+fileName
        fs.writeFileSync(fileNameLoc+".html", content)
        console.log('libreoffice6.4 --convert-to '+req.query.fileType+' '+
            fileNameLoc+".html"+
            '  --writer --headless --norestore --outdir  '+
            common.getConfig().file.location)
        console.log(
            execSync('libreoffice6.4 --convert-to '+req.query.fileType+' '+
                fileNameLoc+".html"+
                '  --writer --headless --norestore --outdir  '+
                common.getConfig().file.location)
                .toString('utf8')
        );
        new ResponseService(res, req).send(200,
            { "file" : "/reportfile/"+fileName+'.'+req.query.fileType})

    }
}
async function handleGetListArea(ctx, req, res, user) {
    let generator = ctx.newOptionsGenerator(req)
    generator.addNotEqual("flagId", 3)
    generator.addEqual("flagId", req.query.flagId)
    //generator.addEqual("parentId", req.query.parentId)
    generator.addEqual("level", 2)
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
    if (req.query.fileType===null || (req.query.fileType!=="pdf" && req.query.fileType!=="docx"))
    {
        let itemss = await ctx.getOilChartStructureRepository().selectList(options, pagination)
        let items = JSON.parse(JSON.stringify(itemss));
        for (let i in items){
            items[i].bankAccounts = items[i].bankAccounts.length;
            let secondTable = await ctx.getCustomerRepository().selectList({
                attributes: [
                    'oilChartStructureId'
                    , [Sequelize.fn('COUNT',  Sequelize.col('*')), 'flagId']
                ],
                where:{"oilChartStructureId":items[i].id},
                group: ['oilChartStructureId']
            })
            secondTable = JSON.parse(JSON.stringify(secondTable))
            if (secondTable instanceof Array && secondTable.length>0)
            {
                //console.log(secondTable)
                secondTable = secondTable[0]
            }
            if(secondTable.flagId)
                items[i].bankAccounts = secondTable.flagId
            else
                items[i].bankAccounts=0
        }

        new ResponseService(res, req).send(200, { items, pagination })

    }else{
        let itemss = await ctx.getOilChartStructureRepository().selectList(options, pagination)
        let items = JSON.parse(JSON.stringify(itemss));
        for (let i in items){
            items[i].bankAccounts = items[i].bankAccounts.length;
            let secondTable = await ctx.getCustomerRepository().selectList({
                attributes: [
                    'oilChartStructureId'
                    , [Sequelize.fn('COUNT',  Sequelize.col('*')), 'flagId']
                ],
                where:{"oilChartStructureId":items[i].id},
                group: ['oilChartStructureId']
            })
            secondTable = JSON.parse(JSON.stringify(secondTable))
            if (secondTable instanceof Array && secondTable.length>0)
            {
                //console.log(secondTable)
                secondTable = secondTable[0]
            }
            if(secondTable.flagId)
                items[i].bankAccounts = secondTable.flagId
            else
                items[i].bankAccounts=0
        }

        let content = await areaList({"report_title":"لیست نواحی","items":JSON.parse(JSON.stringify(items))})
        let fileName = makeid(12)
        let fileNameLoc = common.getConfig().file.location+fileName
        fs.writeFileSync(fileNameLoc+".html", content)
        console.log(
            execSync('libreoffice6.4 --convert-to '+req.query.fileType+' '+
                fileNameLoc+".html"+
                '  --writer --headless --norestore --outdir  '+
                common.getConfig().file.location)
                .toString('utf8')
        );
        new ResponseService(res, req).send(200,
            { "file" : "/reportfile/"+fileName+'.'+req.query.fileType})

    }
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


module.exports = {
    handleGetList,
    handleGet,
    handleGetListArea
}
