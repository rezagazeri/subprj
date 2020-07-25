const {
    surathesabYekHesab,
    CorrectiveTransactions,
    surathesabManateghvaNavahi,
    surathesabMoshtari,
    InvalidCustomerDeposits,
    TransactionInquiry,
    makeid} = require("./template");
const execSync = require('child_process').execSync;

const express = require("express")
const { Context } = require("../../../context/context")
const ResponseService = require('../../../services/ResponseService')
const { Sequelize, Op } = require("sequelize")
const fs = require('fs')
const moment = require('moment-jalaali')

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res 
 */
async function handleGetAll(ctx, req, res, user) {
    let order = req.query.order
    let orderType = (req.query.orderType) ? req.query.orderType : "DESC"
    switch (order) {
        case "sourceName":
            order = [ [{ model: ctx.getTransactionSourceRepository().repo, as: "source" }, 'name', orderType] ]
            break

        case "methodName":
            order = [ [{ model: ctx.getTransactionMethodRepository().repo, as: "method" }, 'name', orderType] ]

        case "customerName":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, 'customerName', orderType] ]
            break

        case "customerType":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerTypeRepository().repo, as: "customerType"}, 'name', orderType] ]
            break

        case "supplyChannel":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerSupplyChannelRepository().repo, as: "supplyChannel"}, 'name', orderType] ]
            break

        case "financialCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'financialCode', orderType] ]
            break

        case "salesCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'salesCode', orderType] ]
            break

        case "stationCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'stationCode', orderType] ]
            break

        default:
            order = undefined
    }
    let generator = ctx.newOptionsGenerator(req)
    generator.addEqual("transactionMethodId", req.query.transactionMethodId)
    generator.addEqual("identifier", req.query.identifier)
    generator.addEqual("amount", req.query.amount)
    generator.addEqual("sourceTransactionId", req.query.sourceTransactionId)
    generator.addEqual("bankAccountId", req.query.bankAccountId)
    generator.addEqual("isValid", true)
    generator.addLikes([ "description" ])
    let { options, pagination } = generator.generateWithPagination()
    options.include = [
        {
            model: ctx.getTransactionMediaRepository().repo,
            as: "media"
        }, {
            model: ctx.getTransactionMethodRepository().repo,
            as: "method"
        }, {
            model: ctx.getTransactionSituationRepository().repo,
            as: "situation"
        }, {
            model: ctx.getTransactionSourceRepository().repo,
            as: "source"
        }, {
            model: ctx.getTransactionTypeRepository().repo,
            as: "type"
        }, {
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
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
        }
    ]
    let customerInclude = {
        model: ctx.getCustomerRepository().repo,
        as: "customer",
        required: true,
        include: [{
            model: ctx.getOilChartStructureRepository().repo,
            as: "oilChartStructure"
        }, {
            model: ctx.getCustomerConcessionaireRepository().repo,
            as: "concessionaire"
        }, {
            model: ctx.getCustomerTypeRepository().repo,
            as: "customerType"
        }, {
            model: ctx.getCustomerSupplyChannelRepository().repo,
            as: "supplyChannel"
        }]
    }
    let oilChartStructures = req.query.oilChartStructures
    if (oilChartStructures != undefined && oilChartStructures != null &&
        oilChartStructures != "" && oilChartStructures != '""' && oilChartStructures != "null") {
        oilChartStructures = oilChartStructures.split(",")
        if (oilChartStructures.length != 0) {
            if (!customerInclude.where) {
                customerInclude.where = {}
            }
            customerInclude.where.oilChartStructureId = {
                [Op.in]: oilChartStructures
            }
        }
    }
    let customerExtraInfoInclude = {
        model: ctx.getCustomerExtraInfoRepository().repo,
        as: "extraInfo"
    }
    let customerId = req.query.customerId
    if (customerId != undefined && customerId != null &&
        customerId != "" && customerId != "null") {
        if (!customerInclude.where) {
            customerInclude.where = {}
        }
        customerInclude.where.id = customerId
    }
    let salesCode = req.query.salesCode
    if (salesCode != undefined && salesCode != null &&
        salesCode != "" && salesCode != "null") {
            if (!customerExtraInfoInclude.where) {
                customerExtraInfoInclude.where = {}
            }
        customerExtraInfoInclude.where.salesCode = salesCode
    }
    let financialCode = req.query.financialCode
    if (financialCode != undefined && financialCode != null &&
        financialCode != "" && financialCode != "null") {
            if (!customerExtraInfoInclude.where) {
                customerExtraInfoInclude.where = {}
            }
        customerExtraInfoInclude.where.financialCode = financialCode
    }
    let payerName = req.query.payerName
    if (payerName != undefined && payerName != null &&
        payerName != "" && payerName != "null") {
        if (!customerInclude.where) customerInclude.where = {}
        customerInclude.where.customerName = {
            [Op.like]: `%${payerName}%`
        }
    }
    customerInclude.include.push(customerExtraInfoInclude)
    options.include.push(customerInclude)
    let bankAccountTypeId = req.query.bankAccountTypeId
    if (bankAccountTypeId != undefined && bankAccountTypeId != null &&
        bankAccountTypeId != "" && bankAccountTypeId != "null") {
            options.include.push({
                model: ctx.getBankAccountRepository().repo,
                as: "bankAccount",
                attributes: [],
                where: {
                    accountTypeId: bankAccountTypeId
                }
            })
        }
    if (order) {
        options.order = order
    }
    options.distinct = true

    if (req.query.fileType===null || (req.query.fileType!=="pdf" && req.query.fileType!=="docx"))
    {
        let items = await ctx.getTransactionRepository().selectList(options, pagination)
        new ResponseService(res, req).send(200, { items, pagination })
    }
    else
    {

        let items = await ctx.getTransactionRepository().selectList(options)

        //console.log(JSON.parse(JSON.stringify(items)))
        //console.log(items)

        let content =""
        if(req.url.includes("/v1/report/region_area_transactions")){
            content = await surathesabManateghvaNavahi({
                "report_title":" صورتحساب مناطق و نواحی",
                "items":JSON.parse(JSON.stringify(items))})
        }else if(req.url.includes("/v1/report/customer_transactions")){
            content = await surathesabMoshtari({
                "report_title":" صورتحساب مشتری",
                "items":JSON.parse(JSON.stringify(items))})
        }else{
            content = await surathesabYekHesab({
                "report_title":" صورتحساب یک حساب",
                "items":JSON.parse(JSON.stringify(items))})
        }
        let fileName = makeid(12)

        let fileNameLoc = common.getConfig().file.location+fileName
        fs.writeFileSync(fileNameLoc+".html", content)
        console.log(
            execSync('libreoffice6.4 --convert-to '+req.query.fileType+' '+
                fileNameLoc+".html"+
                '  --writer --headless --norestore --outdir  '+
                common.getConfig().file.location)
                .toString('utf8'));
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
async function handleGetById(ctx, req, res) {
    let id = req.params.id
    let result = await ctx.getTransactionRepository().selectById(id, null, {
        include: [
            {
                model: ctx.getTransactionMediaRepository().repo,
                as: "media"
            }, {
                model: ctx.getTransactionMethodRepository().repo,
                as: "method"
            }, {
                model: ctx.getTransactionSituationRepository().repo,
                as: "situation"
            }, {
                model: ctx.getTransactionSourceRepository().repo,
                as: "source"
            }, {
                model: ctx.getTransactionTypeRepository().repo,
                as: "type"
            }, {
                model: ctx.getCustomerRepository().repo,
                as: "customer",
                include: [{
                    model: ctx.getOilChartStructureRepository().repo,
                    as: "oilChartStructure"
                }, {
                    model: ctx.getCustomerExtraInfoRepository().repo,
                    as: "extraInfo"
                }, {
                    model: ctx.getCustomerConcessionaireRepository().repo,
                    as: "concessionaire"
                }]
            }
        ]
    })
    new ResponseService(res, req).send(200, result)
}

/**
 *
 * @param ctx
 * @param req
 * @param res
 * @param user
 * @returns {Promise<void>}
 */
async function handleGetRegionAll(ctx, req, res, user) {
    let order = req.query.order
    let orderType = (req.query.orderType) ? req.query.orderType : "DESC"
    switch (order) {
        case "sourceName":
            order = [ [{ model: ctx.getTransactionSourceRepository().repo, as: "source" }, 'name', orderType] ]
            break

        case "methodName":
            order = [ [{ model: ctx.getTransactionMethodRepository().repo, as: "method" }, 'name', orderType] ]

        case "customerName":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, 'customerName', orderType] ]
            break

        case "customerType":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerTypeRepository().repo, as: "customerType"}, 'name', orderType] ]
            break

        case "supplyChannel":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerSupplyChannelRepository().repo, as: "supplyChannel"}, 'name', orderType] ]
            break

        case "financialCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'financialCode', orderType] ]
            break

        case "salesCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'salesCode', orderType] ]
            break

        case "stationCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'stationCode', orderType] ]
            break

        default:
            order = undefined
    }
    let generator = ctx.newOptionsGenerator(req)
    generator.addEqual("transactionMethodId", req.query.transactionMethodId)
    generator.addEqual("identifier", req.query.identifier)
    generator.addEqual("amount", req.query.amount)
    generator.addEqual("sourceTransactionId", req.query.sourceTransactionId)
    generator.addEqual("bankAccountId", req.query.bankAccountId)
    generator.addEqual("isValid", true)
    generator.addLikes([ "description" ])
    let { options, pagination } = generator.generateWithPagination()
    options.include = [
        {
            model: ctx.getTransactionMediaRepository().repo,
            as: "media"
        }, {
            model: ctx.getTransactionMethodRepository().repo,
            as: "method"
        }, {
            model: ctx.getTransactionSituationRepository().repo,
            as: "situation"
        }, {
            model: ctx.getTransactionSourceRepository().repo,
            as: "source"
        }, {
            model: ctx.getTransactionTypeRepository().repo,
            as: "type"
        }, {
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
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
        }
    ]
    let customerInclude = {
        model: ctx.getCustomerRepository().repo,
        as: "customer",
        required: true,
        include: [{
            model: ctx.getOilChartStructureRepository().repo,
            as: "oilChartStructure"
        }, {
            model: ctx.getCustomerConcessionaireRepository().repo,
            as: "concessionaire"
        }, {
            model: ctx.getCustomerTypeRepository().repo,
            as: "customerType"
        }, {
            model: ctx.getCustomerSupplyChannelRepository().repo,
            as: "supplyChannel"
        }]
    }
    let oilChartStructures = req.query.oilChartStructures
    if (oilChartStructures != undefined && oilChartStructures != null &&
        oilChartStructures != "" && oilChartStructures != '""' && oilChartStructures != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (oilChartStructures.length != 0) {
            if (!customerInclude.where) {
                customerInclude.where = {}
            }
            customerInclude.where.oilChartStructureId = {
                [Op.eq]: oilChartStructures
            }
        }
    }
    let financialTypeId = req.query.financialTypeId
    if (financialTypeId != undefined && financialTypeId != null &&
        financialTypeId != "" && financialTypeId != '""' && financialTypeId != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (!options.where) {
            options.where = {}
        }
        options.where = {
            '$bankAccount.financialType.id$': financialTypeId
        }

    }
    let customerExtraInfoInclude = {
        model: ctx.getCustomerExtraInfoRepository().repo,
        as: "extraInfo"
    }

    customerInclude.include.push(customerExtraInfoInclude)
    options.include.push(customerInclude)
    /*let financialTypeId = req.query.financialTypeId
    if (financialTypeId != undefined && financialTypeId != null &&
        financialTypeId != "" && financialTypeId != "null") {
        options.include.push({
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
            attributes: [],
            where: {
                financialTypeId: financialTypeId
            }
        })
    }*/
    if (order) {
        options.order = order
    }
    options.distinct = true
    let items = await ctx.getTransactionRepository().selectList(options, pagination)

    new ResponseService(res, req).send(200, { items, pagination })
}

/**
 *
 * @param ctx
 * @param req
 * @param res
 * @param user
 * @returns {Promise<void>}
 */
async function handleGetAreaAll(ctx, req, res, user) {
    let order = req.query.order
    let orderType = (req.query.orderType) ? req.query.orderType : "DESC"
    switch (order) {
        case "sourceName":
            order = [ [{ model: ctx.getTransactionSourceRepository().repo, as: "source" }, 'name', orderType] ]
            break

        case "methodName":
            order = [ [{ model: ctx.getTransactionMethodRepository().repo, as: "method" }, 'name', orderType] ]

        case "customerName":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, 'customerName', orderType] ]
            break

        case "customerType":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerTypeRepository().repo, as: "customerType"}, 'name', orderType] ]
            break

        case "supplyChannel":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerSupplyChannelRepository().repo, as: "supplyChannel"}, 'name', orderType] ]
            break

        case "financialCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'financialCode', orderType] ]
            break

        case "salesCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'salesCode', orderType] ]
            break

        case "stationCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'stationCode', orderType] ]
            break

        default:
            order = undefined
    }
    let generator = ctx.newOptionsGenerator(req)
    generator.addEqual("transactionMethodId", req.query.transactionMethodId)
    generator.addEqual("identifier", req.query.identifier)
    generator.addEqual("amount", req.query.amount)
    generator.addEqual("sourceTransactionId", req.query.sourceTransactionId)
    generator.addEqual("bankAccountId", req.query.bankAccountId)
    generator.addEqual("isValid", true)
    generator.addLikes([ "description" ])
    let { options, pagination } = generator.generateWithPagination()
    options.include = [
        {
            model: ctx.getTransactionMediaRepository().repo,
            as: "media"
        }, {
            model: ctx.getTransactionMethodRepository().repo,
            as: "method"
        }, {
            model: ctx.getTransactionSituationRepository().repo,
            as: "situation"
        }, {
            model: ctx.getTransactionSourceRepository().repo,
            as: "source"
        }, {
            model: ctx.getTransactionTypeRepository().repo,
            as: "type"
        }, {
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
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
        }
    ]
    let customerInclude = {
        model: ctx.getCustomerRepository().repo,
        as: "customer",
        required: true,
        include: [{
            model: ctx.getOilChartStructureRepository().repo,
            as: "oilChartStructure"
        }, {
            model: ctx.getCustomerConcessionaireRepository().repo,
            as: "concessionaire"
        }, {
            model: ctx.getCustomerTypeRepository().repo,
            as: "customerType"
        }, {
            model: ctx.getCustomerSupplyChannelRepository().repo,
            as: "supplyChannel"
        }]
    }
    let oilChartStructures = req.query.oilChartStructures
    if (oilChartStructures != undefined && oilChartStructures != null &&
        oilChartStructures != "" && oilChartStructures != '""' && oilChartStructures != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (oilChartStructures.length != 0) {
            if (!customerInclude.where) {
                customerInclude.where = {}
            }
            customerInclude.where.oilChartStructureId = {
                [Op.eq]: oilChartStructures
            }
        }
    }
    let financialTypeId = req.query.financialTypeId
    if (financialTypeId != undefined && financialTypeId != null &&
        financialTypeId != "" && financialTypeId != '""' && financialTypeId != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (!options.where) {
            options.where = {}
        }
        options.where = {
            '$bankAccount.financialType.id$': financialTypeId
        }

    }
    let customerExtraInfoInclude = {
        model: ctx.getCustomerExtraInfoRepository().repo,
        as: "extraInfo"
    }

    customerInclude.include.push(customerExtraInfoInclude)
    options.include.push(customerInclude)
    /*let financialTypeId = req.query.financialTypeId
    if (financialTypeId != undefined && financialTypeId != null &&
        financialTypeId != "" && financialTypeId != "null") {
        options.include.push({
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
            attributes: [],
            where: {
                financialTypeId: financialTypeId
            }
        })
    }*/
    if (order) {
        options.order = order
    }
    options.distinct = true
    if (req.query.fileType===null || (req.query.fileType!=="pdf" && req.query.fileType!=="docx"))
    {
        let items = await ctx.getTransactionRepository().selectList(options, pagination)
        new ResponseService(res, req).send(200, { items, pagination })

    }else{
        let items = await ctx.getTransactionRepository().selectList(options, pagination)
        let content = await VaziatGardeshManateghVaNavahi({"items":JSON.parse(JSON.stringify(items))})
        let fileName = makeid(12)

        let fileNameLoc = common.getConfig().file.location+fileName
        fs.writeFileSync(fileNameLoc+".html", content)
        console.log(
            execSync('libreoffice6.4 --convert-to '+req.query.fileType+' '+
                fileNameLoc+".html"+
                '  --writer --headless --norestore --outdir  '+
                common.getConfig().file.location)
                .toString('utf8'));
        new ResponseService(res, req).send(200,
            { "file" : "/reportfile/"+fileName+'.'+req.query.fileType})

    }
}

/**
 *
 * @param ctx
 * @param req
 * @param res
 * @param user
 * @returns {Promise<void>}
 */
async function handleGetRegionTurnOverAll(ctx, req, res, user) {
    let order = req.query.order
    let orderType = (req.query.orderType) ? req.query.orderType : "DESC"
    req.query.pageSize=10000000
    switch (order) {
        case "sourceName":
            order = [ [{ model: ctx.getTransactionSourceRepository().repo, as: "source" }, 'name', orderType] ]
            break

        case "methodName":
            order = [ [{ model: ctx.getTransactionMethodRepository().repo, as: "method" }, 'name', orderType] ]

        case "customerName":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, 'customerName', orderType] ]
            break

        case "customerType":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerTypeRepository().repo, as: "customerType"}, 'name', orderType] ]
            break

        case "supplyChannel":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerSupplyChannelRepository().repo, as: "supplyChannel"}, 'name', orderType] ]
            break

        case "financialCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'financialCode', orderType] ]
            break

        case "salesCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'salesCode', orderType] ]
            break

        case "stationCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'stationCode', orderType] ]
            break

        default:
            order = undefined
    }
    let generator = ctx.newOptionsGenerator(req)
    generator.addEqual("transactionMethodId", req.query.transactionMethodId)
    generator.addEqual("identifier", req.query.identifier)
    generator.addEqual("amount", req.query.amount)
    generator.addEqual("sourceTransactionId", req.query.sourceTransactionId)
    generator.addEqual("bankAccountId", req.query.bankAccountId)
    generator.addEqual("isValid", true)
    generator.addLikes([ "description" ])
    let { options, pagination } = generator.generateWithPagination()
    options.include = [
        {
            model: ctx.getTransactionMediaRepository().repo,
            as: "media"
        }, {
            model: ctx.getTransactionMethodRepository().repo,
            as: "method"
        }, {
            model: ctx.getTransactionSituationRepository().repo,
            as: "situation"
        }, {
            model: ctx.getTransactionSourceRepository().repo,
            as: "source"
        }, {
            model: ctx.getTransactionTypeRepository().repo,
            as: "type"
        }, {
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
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
        }
    ]
    let customerInclude = {
        model: ctx.getCustomerRepository().repo,
        as: "customer",
        required: true,
        include: [{
            model: ctx.getOilChartStructureRepository().repo,
            as: "oilChartStructure"
        }, {
            model: ctx.getCustomerConcessionaireRepository().repo,
            as: "concessionaire"
        }, {
            model: ctx.getCustomerTypeRepository().repo,
            as: "customerType"
        }, {
            model: ctx.getCustomerSupplyChannelRepository().repo,
            as: "supplyChannel"
        }]
    }
    let oilChartStructures = req.query.oilChartStructures
    if (oilChartStructures != undefined && oilChartStructures != null &&
        oilChartStructures != "" && oilChartStructures != '""' && oilChartStructures != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (oilChartStructures.length != 0) {
            if (!customerInclude.where) {
                customerInclude.where = {}
            }
            customerInclude.where.oilChartStructureId = {
                [Op.eq]: oilChartStructures
            }
        }
    }
    let financialTypeId = req.query.financialTypeId
    if (financialTypeId != undefined && financialTypeId != null &&
        financialTypeId != "" && financialTypeId != '""' && financialTypeId != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (!options.where) {
            options.where = {}
        }
        options.where = {
            '$bankAccount.financialType.id$': financialTypeId
        }

    }
    let customerExtraInfoInclude = {
        model: ctx.getCustomerExtraInfoRepository().repo,
        as: "extraInfo"
    }

    customerInclude.include.push(customerExtraInfoInclude)
    options.include.push(customerInclude)
    /*let financialTypeId = req.query.financialTypeId
    if (financialTypeId != undefined && financialTypeId != null &&
        financialTypeId != "" && financialTypeId != "null") {
        options.include.push({
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
            attributes: [],
            where: {
                financialTypeId: financialTypeId
            }
        })
    }*/
    if (order) {
        options.order = order
    }
    options.distinct = true
    let items = await ctx.getTransactionRepository().selectList(options)
    var obj={};
    var arr = {
        "Branch": {"Count":0,"Sum":0},
        "Internet": {"Count":0,"Sum":0},
        "POS": {"Count":0,"Sum":0},
        "PinPad": {"Count":0,"Sum":0},
        "Telephone": {"Count":0,"Sum":0},
        "Mobile": {"Count":0,"Sum":0},
        "SMS": {"Count":0,"Sum":0},
        "ATM": {"Count":0,"Sum":0},
        "Transfer": {"Count":0,"Sum":0},
        "Increase": {"Count":0,"Sum":0},
        "Decrease": {"Count":0,"Sum":0},
        "Revised": {"Count":0,"Sum":0},
        "General": {"Count":0,"Sum":0},
        "Sum": {"Count":0,"Sum":0},
    };
    let TotalSum ={
        "Branch": {"Count":0,"Sum":0},
        "Internet": {"Count":0,"Sum":0},
        "POS": {"Count":0,"Sum":0},
        "PinPad": {"Count":0,"Sum":0},
        "Telephone": {"Count":0,"Sum":0},
        "Mobile": {"Count":0,"Sum":0},
        "SMS": {"Count":0,"Sum":0},
        "ATM": {"Count":0,"Sum":0},
        "Transfer": {"Count":0,"Sum":0},
        "Increase": {"Count":0,"Sum":0},
        "Decrease": {"Count":0,"Sum":0},
        "Revised": {"Count":0,"Sum":0},
        "General": {"Count":0,"Sum":0},
        "Sum": {"Count":0,"Sum":0},
    };
    for (const item of items ){
        if(!item.method)continue;
        if(obj[item['bankAccount']['accountNumber']] === undefined){
            //console.log(item.bankAccount.accountNumber)
            obj[item.bankAccount.accountNumber] = {
                "Branch": {"Count":0,"Sum":0},
                "Internet": {"Count":0,"Sum":0},
                "POS": {"Count":0,"Sum":0},
                "PinPad": {"Count":0,"Sum":0},
                "Telephone": {"Count":0,"Sum":0},
                "Mobile": {"Count":0,"Sum":0},
                "SMS": {"Count":0,"Sum":0},
                "ATM": {"Count":0,"Sum":0},
                "Transfer": {"Count":0,"Sum":0},
                "Increase": {"Count":0,"Sum":0},
                "Decrease": {"Count":0,"Sum":0},
                "Revised": {"Count":0,"Sum":0},
                "General": {"Count":0,"Sum":0},
                "Sum": {"Count":0,"Sum":0},
            }
        }
        if (item.media.code=='CHQ' ||item.media.code=='54' ||item.media.code=='CRE' ) {
            obj[item.bankAccount.accountNumber].Branch.Count++;
            obj[item.bankAccount.accountNumber].Branch.Sum+=item.amount;
            //obj['TotalSum'].Revised.Count++;
            //obj['TotalSum'].Revised.Sum+=item.amount;
        }else if (item.method.code=='Fee' ||item.method.code=='Reversal' ||item.method.code=='FeeReversal' ) {
            obj[item.bankAccount.accountNumber].Revised.Count++;
            obj[item.bankAccount.accountNumber].Revised.Sum+=item.amount;
            //obj['TotalSum'].Revised.Count++;
            //obj['TotalSum'].Revised.Sum+=item.amount;
        }else if(item.method.code=='ATM_Withdraw' ||item.method.code=='ATM_Payment' ||item.method.code=='ATM_Transfer'||
            item.method.code=='ATM_TeransferTo' ||item.method.code=='ATM_TransferFrom'){
            obj[item.bankAccount.accountNumber].ATM.Count++;
            obj[item.bankAccount.accountNumber].ATM.Sum+=item.amount;
            //obj['TotalSum'].ATM.Count++;
            //obj['TotalSum'].ATM.Sum+=item.amount;

        }else if(item.method.code=='POS_Buy' ||item.method.code=='POS_BillPayment' ){
            obj[item.bankAccount.accountNumber].POS.Count++;
            obj[item.bankAccount.accountNumber].POS.Sum+=item.amount;
            //obj['TotalSum'].POS.Count++;
            //obj['TotalSum'].POS.Sum+=item.amount;

        }else if(item.method.code=='PinPad_Withdraw' ||item.method.code=='PinPad_Transfer' ||item.method.code=='PinPad_TransferTo'||
            item.method.code=='PinPad_TransferFrom' ){
            obj[item.bankAccount.accountNumber].PinPad.Count++;
            obj[item.bankAccount.accountNumber].PinPad.Sum+=item.amount;
            //obj['TotalSum'].PinPad.Count++;
            //obj['TotalSum'].PinPad.Sum+=item.amount;

        }else if(item.method.code=='Internet_Buy' ||item.method.code=='Internet_BillPayment' ||item.method.code=='Internet_Transfer'||
            item.method.code=='Internet_TransferTo' || item.method.code=='Internet_TransferFrom' ){
            obj[item.bankAccount.accountNumber].Internet.Count++;
            obj[item.bankAccount.accountNumber].Internet.Sum+=item.amount;
            //obj['TotalSum'].Internet.Count++;
            //obj['TotalSum'].Internet.Sum+=item.amount;

        }else if(item.method.code=='VRU_BillPayment' ||item.method.code=='Mobile_Buy' ||item.method.code=='Mobile_BillPayment'){
            obj[item.bankAccount.accountNumber].Mobile.Count++;
            obj[item.bankAccount.accountNumber].Mobile.Sum+=item.amount;
            //obj['TotalSum'].Mobile.Count++;
            //obj['TotalSum'].Mobile.Sum+=item.amount;

        }else if(item.method.code=='TransferFromRTGS' ||item.method.code=='TransferToRTGS' ||item.method.code=='TransferFromACH'||
            item.method.code=='TransferToACH' ){
            obj[item.bankAccount.accountNumber].Transfer.Count++;
            obj[item.bankAccount.accountNumber].Transfer.Sum+=item.amount;
            //obj['TotalSum'].Transfer.Count++;
            //obj['TotalSum'].Transfer.Sum+=item.amount;

        }else if(item.method.code=='Incoming' ||item.method.code=='Salary' ||item.method.code=='Group_Deposit'||
            item.method.code=='Group_Withdraw' ){
            obj[item.bankAccount.accountNumber].Increase.Count++;
            obj[item.bankAccount.accountNumber].Increase.Sum+=item.amount;
            //obj['TotalSum'].Increase.Count++;
            //obj['TotalSum'].Increase.Sum+=item.amount;

        }
        else if(item.method.code=='Issue' ||item.method.code=='WaterBill' ||item.method.code=='ElectricBill'||
            item.method.code=='GasBill' || item.method.code=='PhoneBill' || item.method.code=='MobileBill'||
            item.method.code=='TaxBill' || item.method.code=='PoliceBill' ){
            obj[item.bankAccount.accountNumber].Decrease.Count++;
            obj[item.bankAccount.accountNumber].Decrease.Sum+=item.amount;
            //obj['TotalSum'].Decrease.Count++;
            //obj['TotalSum'].Decrease.Sum+=item.amount;
        }
        else if(item.method.code=='General'  ){
            obj[item.bankAccount.accountNumber].General.Count++;
            obj[item.bankAccount.accountNumber].General.Sum+=item.amount;
            //obj['TotalSum'].Decrease.Count++;
            //obj['TotalSum'].Decrease.Sum+=item.amount;
        }
        else{
            console.log(item.method.code)
        }

        obj[item.bankAccount.accountNumber].Sum.Count++;
        obj[item.bankAccount.accountNumber].Sum.Sum+=item.amount;

    }

    if((pagination.count) <= (pagination.page*pagination.pageSize)){
        delete options.limit;
        delete options.offset;
        items = await ctx.getTransactionRepository().selectList(options)
        for (const item of items ){
            if(!item.method)continue;
            if (item.media.code=='CHQ' ||item.media.code=='54' ||item.media.code=='CRE' ) {
                TotalSum.Branch.Count++;
                TotalSum.Branch.Sum+=item.amount;
                //obj['TotalSum'].Revised.Count++;
                //obj['TotalSum'].Revised.Sum+=item.amount;
            }else if (item.method.code=='Fee' ||item.method.code=='Reversal' ||item.method.code=='FeeReversal' ) {
                TotalSum.Revised.Count++;
                TotalSum.Revised.Sum+=item.amount;
            }
            else if(item.method.code=='ATM_Withdraw' ||item.method.code=='ATM_Payment' ||item.method.code=='ATM_Transfer'||
                item.method.code=='ATM_TeransferTo' ||item.method.code=='ATM_TransferFrom'){
                TotalSum.ATM.Count++;
                TotalSum.ATM.Sum+=item.amount;
            }else if(item.method.code=='POS_Buy' ||item.method.code=='POS_BillPayment' )
            {
                TotalSum.POS.Count++;
                TotalSum.POS.Sum+=item.amount;
            }
            else if(item.method.code=='PinPad_Withdraw' ||item.method.code=='PinPad_Transfer' ||item.method.code=='PinPad_TransferTo'||
                item.method.code=='PinPad_TransferFrom' ){
                TotalSum.PinPad.Count++;
                TotalSum.PinPad.Sum+=item.amount;
            }else if(item.method.code=='Internet_Buy' ||item.method.code=='Internet_BillPayment' ||item.method.code=='Internet_Transfer'||
                item.method.code=='Internet_TransferTo' || item.method.code=='Internet_TransferFrom' ){
                TotalSum.Internet.Count++;
                TotalSum.Internet.Sum+=item.amount;
            }else if(item.method.code=='VRU_BillPayment' ||item.method.code=='Mobile_Buy' ||item.method.code=='Mobile_BillPayment')
            {
                TotalSum.Mobile.Count++;
                TotalSum.Mobile.Sum+=item.amount;
            }
            else if(item.method.code=='TransferFromRTGS' ||item.method.code=='TransferToRTGS' ||item.method.code=='TransferFromACH'||
                item.method.code=='TransferToACH' )
            {
                TotalSum.Transfer.Count++;
                TotalSum.Transfer.Sum+=item.amount;
            }
            else if(item.method.code=='Incoming' ||item.method.code=='Salary' ||item.method.code=='Group_Deposit'||
                item.method.code=='Group_Withdraw' )
            {
                TotalSum.Increase.Count++;
                TotalSum.Increase.Sum+=item.amount;
            }
            else if(item.method.code=='Issue' ||item.method.code=='WaterBill' ||item.method.code=='ElectricBill'||
                item.method.code=='GasBill' || item.method.code=='PhoneBill' || item.method.code=='MobileBill'||
                item.method.code=='TaxBill' || item.method.code=='PoliceBill' )
            {
                TotalSum.Decrease.Count++;
                TotalSum.Decrease.Sum+=item.amount;
            }
            else if(item.method.code=='General'  ){
                TotalSum.General.Count++;
                TotalSum.General.Sum+=item.amount;
                //obj['TotalSum'].Decrease.Count++;
                //obj['TotalSum'].Decrease.Sum+=item.amount;
            }
            else{
                console.log(item.method.code)
            }
            TotalSum.Sum.Count++;
            TotalSum.Sum.Sum+=item.amount;

        }
        new ResponseService(res, req).send(200, { "Items":obj, TotalSum, pagination })
    }else
    {
        new ResponseService(res, req).send(200, { "Items":obj, pagination })
    }
    if (req.query.fileType===null || (req.query.fileType!=="pdf" && req.query.fileType!=="docx"))
    {
        if((pagination.count) <= (pagination.page*pagination.pageSize))
            new ResponseService(res, req).send(200, { "Items":obj, TotalSum, pagination })
        else
            new ResponseService(res, req).send(200, { "Items":obj, pagination })
    }else{
        let content = await VaziatGardeshManateghVaNavahi({"items":JSON.parse(JSON.stringify(obj))})
        let fileName = makeid(12)

        let fileNameLoc = common.getConfig().file.location+fileName
        fs.writeFileSync(fileNameLoc+".html", content)
        console.log(
            execSync('libreoffice6.4 --convert-to '+req.query.fileType+' '+
                fileNameLoc+".html"+
                '  --writer --headless --norestore --outdir  '+
                common.getConfig().file.location)
                .toString('utf8'));
        new ResponseService(res, req).send(200,
            { "file" : "/reportfile/"+fileName+'.'+req.query.fileType})

    }
}

/**
 *
 * @param ctx
 * @param req
 * @param res
 * @param user
 * @returns {Promise<void>}
 */
async function handleGetAreaTurnOverAll(ctx, req, res, user) {
    let order = req.query.order
    let orderType = (req.query.orderType) ? req.query.orderType : "DESC"
    switch (order) {
        case "sourceName":
            order = [ [{ model: ctx.getTransactionSourceRepository().repo, as: "source" }, 'name', orderType] ]
            break

        case "methodName":
            order = [ [{ model: ctx.getTransactionMethodRepository().repo, as: "method" }, 'name', orderType] ]

        case "customerName":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, 'customerName', orderType] ]
            break

        case "customerType":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerTypeRepository().repo, as: "customerType"}, 'name', orderType] ]
            break

        case "supplyChannel":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerSupplyChannelRepository().repo, as: "supplyChannel"}, 'name', orderType] ]
            break

        case "financialCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'financialCode', orderType] ]
            break

        case "salesCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'salesCode', orderType] ]
            break

        case "stationCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'stationCode', orderType] ]
            break

        default:
            order = undefined
    }
    let generator = ctx.newOptionsGenerator(req)
    generator.addEqual("transactionMethodId", req.query.transactionMethodId)
    generator.addEqual("identifier", req.query.identifier)
    generator.addEqual("amount", req.query.amount)
    generator.addEqual("sourceTransactionId", req.query.sourceTransactionId)
    generator.addEqual("bankAccountId", req.query.bankAccountId)
    generator.addEqual("isValid", true)
    generator.addLikes([ "description" ])
    let { options, pagination } = generator.generateWithPagination()
    options.include = [
        {
            model: ctx.getTransactionMediaRepository().repo,
            as: "media"
        }, {
            model: ctx.getTransactionMethodRepository().repo,
            as: "method"
        }, {
            model: ctx.getTransactionSituationRepository().repo,
            as: "situation"
        }, {
            model: ctx.getTransactionSourceRepository().repo,
            as: "source"
        }, {
            model: ctx.getTransactionTypeRepository().repo,
            as: "type"
        }, {
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
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
        }
    ]
    let customerInclude = {
        model: ctx.getCustomerRepository().repo,
        as: "customer",
        required: true,
        include: [{
            model: ctx.getOilChartStructureRepository().repo,
            as: "oilChartStructure"
        }, {
            model: ctx.getCustomerConcessionaireRepository().repo,
            as: "concessionaire"
        }, {
            model: ctx.getCustomerTypeRepository().repo,
            as: "customerType"
        }, {
            model: ctx.getCustomerSupplyChannelRepository().repo,
            as: "supplyChannel"
        }]
    }
    let oilChartStructures = req.query.oilChartStructures
    if (oilChartStructures != undefined && oilChartStructures != null &&
        oilChartStructures != "" && oilChartStructures != '""' && oilChartStructures != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (oilChartStructures.length != 0) {
            if (!customerInclude.where) {
                customerInclude.where = {}
            }
            customerInclude.where.oilChartStructureId = {
                [Op.eq]: oilChartStructures
            }
        }
    }
    let financialTypeId = req.query.financialTypeId
    if (financialTypeId != undefined && financialTypeId != null &&
        financialTypeId != "" && financialTypeId != '""' && financialTypeId != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (!options.where) {
            options.where = {}
        }
        options.where = {
            '$bankAccount.financialType.id$': financialTypeId
        }

    }
    let customerExtraInfoInclude = {
        model: ctx.getCustomerExtraInfoRepository().repo,
        as: "extraInfo"
    }

    customerInclude.include.push(customerExtraInfoInclude)
    options.include.push(customerInclude)
    /*let financialTypeId = req.query.financialTypeId
    if (financialTypeId != undefined && financialTypeId != null &&
        financialTypeId != "" && financialTypeId != "null") {
        options.include.push({
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
            attributes: [],
            where: {
                financialTypeId: financialTypeId
            }
        })
    }*/
    if (order) {
        options.order = order
    }
    options.distinct = true
    let items = await ctx.getTransactionRepository().selectList(options, pagination)
    var obj={};
    var arr = {
        "Branch": {"Count":0,"Sum":0},
        "Internet": {"Count":0,"Sum":0},
        "POS": {"Count":0,"Sum":0},
        "PinPad": {"Count":0,"Sum":0},
        "Telephone": {"Count":0,"Sum":0},
        "Mobile": {"Count":0,"Sum":0},
        "SMS": {"Count":0,"Sum":0},
        "ATM": {"Count":0,"Sum":0},
        "Transfer": {"Count":0,"Sum":0},
        "Increase": {"Count":0,"Sum":0},
        "Decrease": {"Count":0,"Sum":0},
        "Revised": {"Count":0,"Sum":0},
        "Sum": {"Count":0,"Sum":0},
    };
    let TotalSum ={
        "Branch": {"Count":0,"Sum":0},
        "Internet": {"Count":0,"Sum":0},
        "POS": {"Count":0,"Sum":0},
        "PinPad": {"Count":0,"Sum":0},
        "Telephone": {"Count":0,"Sum":0},
        "Mobile": {"Count":0,"Sum":0},
        "SMS": {"Count":0,"Sum":0},
        "ATM": {"Count":0,"Sum":0},
        "Transfer": {"Count":0,"Sum":0},
        "Increase": {"Count":0,"Sum":0},
        "Decrease": {"Count":0,"Sum":0},
        "Revised": {"Count":0,"Sum":0},
        "General": {"Count":0,"Sum":0},
        "Sum": {"Count":0,"Sum":0},
    };
    for (const item of items ){
        if(!item.method)continue;
        if(obj[item['bankAccount']['accountNumber']] === undefined){
            //console.log(item.bankAccount.accountNumber)
            obj[item.bankAccount.accountNumber] = {
                "Branch": {"Count":0,"Sum":0},
                "Internet": {"Count":0,"Sum":0},
                "POS": {"Count":0,"Sum":0},
                "PinPad": {"Count":0,"Sum":0},
                "Telephone": {"Count":0,"Sum":0},
                "Mobile": {"Count":0,"Sum":0},
                "SMS": {"Count":0,"Sum":0},
                "ATM": {"Count":0,"Sum":0},
                "Transfer": {"Count":0,"Sum":0},
                "Increase": {"Count":0,"Sum":0},
                "Decrease": {"Count":0,"Sum":0},
                "Revised": {"Count":0,"Sum":0},
                "General": {"Count":0,"Sum":0},
                "Sum": {"Count":0,"Sum":0},
            }
        }
        if (item.media.code=='CHQ' ||item.media.code=='54' ||item.media.code=='CRE' ) {
            obj[item.bankAccount.accountNumber].Branch.Count++;
            obj[item.bankAccount.accountNumber].Branch.Sum+=item.amount;
            //obj['TotalSum'].Revised.Count++;
            //obj['TotalSum'].Revised.Sum+=item.amount;
        }else if (item.method.code=='Fee' ||item.method.code=='Reversal' ||item.method.code=='FeeReversal' ) {
            obj[item.bankAccount.accountNumber].Revised.Count++;
            obj[item.bankAccount.accountNumber].Revised.Sum+=item.amount;
            //TotalSum.Revised.Count++;
            //TotalSum.Revised.Sum+=item.amount;
        }
        else if(item.method.code=='ATM_Withdraw' ||item.method.code=='ATM_Payment' ||item.method.code=='ATM_Transfer'||
            item.method.code=='ATM_TeransferTo' ||item.method.code=='ATM_TransferFrom'){
            obj[item.bankAccount.accountNumber].ATM.Count++;
            obj[item.bankAccount.accountNumber].ATM.Sum+=item.amount;
            //TotalSum.ATM.Count++;
            //TotalSum.ATM.Sum+=item.amount;

        }
        else if(item.method.code=='POS_Buy' ||item.method.code=='POS_BillPayment' ){
            obj[item.bankAccount.accountNumber].POS.Count++;
            obj[item.bankAccount.accountNumber].POS.Sum+=item.amount;
            //TotalSum.POS.Count++;
            //TotalSum.POS.Sum+=item.amount;

        }
        else if(item.method.code=='PinPad_Withdraw' ||item.method.code=='PinPad_Transfer' ||item.method.code=='PinPad_TransferTo'||
            item.method.code=='PinPad_TransferFrom' ){
            obj[item.bankAccount.accountNumber].PinPad.Count++;
            obj[item.bankAccount.accountNumber].PinPad.Sum+=item.amount;
            //TotalSum.PinPad.Count++;
            //TotalSum.PinPad.Sum+=item.amount;

        }else if(item.method.code=='Internet_Buy' ||item.method.code=='Internet_BillPayment' ||item.method.code=='Internet_Transfer'||
            item.method.code=='Internet_TransferTo' || item.method.code=='Internet_TransferFrom' ){
            obj[item.bankAccount.accountNumber].Internet.Count++;
            obj[item.bankAccount.accountNumber].Internet.Sum+=item.amount;
            //TotalSum.Internet.Count++;
            //TotalSum.Internet.Sum+=item.amount;

        }
        else if(item.method.code=='VRU_BillPayment' ||item.method.code=='Mobile_Buy' ||item.method.code=='Mobile_BillPayment'){
            obj[item.bankAccount.accountNumber].Mobile.Count++;
            obj[item.bankAccount.accountNumber].Mobile.Sum+=item.amount;
            //TotalSum.Mobile.Count++;
            //TotalSum.Mobile.Sum+=item.amount;

        }
        else if(item.method.code=='TransferFromRTGS' ||item.method.code=='TransferToRTGS' ||item.method.code=='TransferFromACH'||
            item.method.code=='TransferToACH' ){
            obj[item.bankAccount.accountNumber].Transfer.Count++;
            obj[item.bankAccount.accountNumber].Transfer.Sum+=item.amount;
            //TotalSum.Transfer.Count++;
            //TotalSum.Transfer.Sum+=item.amount;

        }
        else if(item.method.code=='Incoming' ||item.method.code=='Salary' ||item.method.code=='Group_Deposit'||
            item.method.code=='Group_Withdraw' ){
            obj[item.bankAccount.accountNumber].Increase.Count++;
            obj[item.bankAccount.accountNumber].Increase.Sum+=item.amount;
            //TotalSum.Increase.Count++;
            //TotalSum.Increase.Sum+=item.amount;

        }
        else if(item.method.code=='Issue' ||item.method.code=='WaterBill' ||item.method.code=='ElectricBill'||
            item.method.code=='GasBill' || item.method.code=='PhoneBill' || item.method.code=='MobileBill'||
            item.method.code=='TaxBill' || item.method.code=='PoliceBill' ){
            obj[item.bankAccount.accountNumber].Decrease.Count++;
            obj[item.bankAccount.accountNumber].Decrease.Sum+=item.amount;
            //TotalSum.Decrease.Count++;
            //TotalSum.Decrease.Sum+=item.amount;
        }
        else if(item.method.code=='General'  ){
            obj[item.bankAccount.accountNumber].General.Count++;
            obj[item.bankAccount.accountNumber].General.Sum+=item.amount;
            //obj['TotalSum'].Decrease.Count++;
            //obj['TotalSum'].Decrease.Sum+=item.amount;
        }
        obj[item.bankAccount.accountNumber].Sum.Count++;
        obj[item.bankAccount.accountNumber].Sum.Sum+=item.amount;

    }
    if((pagination.count) <= (pagination.page*pagination.pageSize)){
        delete options.limit;
        delete options.offset;

        items = await ctx.getTransactionRepository().selectList(options)
        for (const item of items ){
            if(!item.method)continue;
            if (item.media.code=='CHQ' ||item.media.code=='54' ||item.media.code=='CRE' ) {
                TotalSum.Branch.Count++;
                TotalSum.Branch.Sum+=item.amount;
                //obj['TotalSum'].Revised.Count++;
                //obj['TotalSum'].Revised.Sum+=item.amount;
            }else if (item.method.code=='Fee' ||item.method.code=='Reversal' ||item.method.code=='FeeReversal' ) {
                TotalSum.Revised.Count++;
                TotalSum.Revised.Sum+=item.amount;
            }
            else if(item.method.code=='ATM_Withdraw' ||item.method.code=='ATM_Payment' ||item.method.code=='ATM_Transfer'||
                item.method.code=='ATM_TeransferTo' ||item.method.code=='ATM_TransferFrom'){
                TotalSum.ATM.Count++;
                TotalSum.ATM.Sum+=item.amount;
            }else if(item.method.code=='POS_Buy' ||item.method.code=='POS_BillPayment' )
            {
                TotalSum.POS.Count++;
                TotalSum.POS.Sum+=item.amount;
            }
            else if(item.method.code=='PinPad_Withdraw' ||item.method.code=='PinPad_Transfer' ||item.method.code=='PinPad_TransferTo'||
                item.method.code=='PinPad_TransferFrom' ){
                TotalSum.PinPad.Count++;
                TotalSum.PinPad.Sum+=item.amount;
            }else if(item.method.code=='Internet_Buy' ||item.method.code=='Internet_BillPayment' ||item.method.code=='Internet_Transfer'||
                item.method.code=='Internet_TransferTo' || item.method.code=='Internet_TransferFrom' ){
                TotalSum.Internet.Count++;
                TotalSum.Internet.Sum+=item.amount;
            }else if(item.method.code=='VRU_BillPayment' ||item.method.code=='Mobile_Buy' ||item.method.code=='Mobile_BillPayment')
            {
                TotalSum.Mobile.Count++;
                TotalSum.Mobile.Sum+=item.amount;
            }
            else if(item.method.code=='TransferFromRTGS' ||item.method.code=='TransferToRTGS' ||item.method.code=='TransferFromACH'||
                item.method.code=='TransferToACH' )
            {
                TotalSum.Transfer.Count++;
                TotalSum.Transfer.Sum+=item.amount;
            }
            else if(item.method.code=='Incoming' ||item.method.code=='Salary' ||item.method.code=='Group_Deposit'||
                item.method.code=='Group_Withdraw' )
            {
                TotalSum.Increase.Count++;
                TotalSum.Increase.Sum+=item.amount;
            }
            else if(item.method.code=='Issue' ||item.method.code=='WaterBill' ||item.method.code=='ElectricBill'||
                item.method.code=='GasBill' || item.method.code=='PhoneBill' || item.method.code=='MobileBill'||
                item.method.code=='TaxBill' || item.method.code=='PoliceBill' )
            {
                TotalSum.Decrease.Count++;
                TotalSum.Decrease.Sum+=item.amount;
            }
            else if(item.method.code=='General'  ){
                TotalSum.General.Count++;
                TotalSum.General.Sum+=item.amount;
                //obj['TotalSum'].Decrease.Count++;
                //obj['TotalSum'].Decrease.Sum+=item.amount;
            }
            TotalSum.Sum.Count++;
            TotalSum.Sum.Sum+=item.amount;

        }
        new ResponseService(res, req).send(200, { "Items":obj, TotalSum, pagination })
    }else
        new ResponseService(res, req).send(200, { "Items":obj, pagination })
}

/**
 *
 * @param ctx
 * @param req
 * @param res
 * @param user
 * @returns {Promise<void>}
 */
async function handleCheckIfTransactionExists(ctx, req, res, user) {
    let order = req.query.order
    let orderType = (req.query.orderType) ? req.query.orderType : "DESC"
    switch (order) {
        case "sourceName":
            order = [ [{ model: ctx.getTransactionSourceRepository().repo, as: "source" }, 'name', orderType] ]
            break

        case "methodName":
            order = [ [{ model: ctx.getTransactionMethodRepository().repo, as: "method" }, 'name', orderType] ]

        case "customerName":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, 'customerName', orderType] ]
            break

        case "customerType":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerTypeRepository().repo, as: "customerType"}, 'name', orderType] ]
            break

        case "supplyChannel":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerSupplyChannelRepository().repo, as: "supplyChannel"}, 'name', orderType] ]
            break

        case "financialCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'financialCode', orderType] ]
            break

        case "salesCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'salesCode', orderType] ]
            break

        case "stationCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'stationCode', orderType] ]
            break

        default:
            order = undefined
    }
    let generator = ctx.newOptionsGenerator(req)
    generator.addEqual("transactionMethodId", req.query.transactionMethodId)
    generator.addEqual("identifier", req.query.identifier)
    generator.addEqual("amount", req.query.amount)
    generator.addEqual("sourceTransactionId", req.query.sourceTransactionId)
    generator.addEqual("bankAccountId", req.query.bankAccountId)
    generator.addEqual("isValid", true)
    generator.addLikes([ "description" ])
    let { options, pagination } = generator.generateWithPagination()
    options.include = [
        {
            model: ctx.getTransactionMediaRepository().repo,
            as: "media"
        }, {
            model: ctx.getTransactionMethodRepository().repo,
            as: "method"
        }, {
            model: ctx.getTransactionSituationRepository().repo,
            as: "situation"
        }, {
            model: ctx.getTransactionSourceRepository().repo,
            as: "source"
        }, {
            model: ctx.getTransactionTypeRepository().repo,
            as: "type"
        }, {
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
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
        }
    ]
    let customerInclude = {
        model: ctx.getCustomerRepository().repo,
        as: "customer",
        required: true,
        include: [{
            model: ctx.getOilChartStructureRepository().repo,
            as: "oilChartStructure"
        }, {
            model: ctx.getCustomerConcessionaireRepository().repo,
            as: "concessionaire"
        }, {
            model: ctx.getCustomerTypeRepository().repo,
            as: "customerType"
        }, {
            model: ctx.getCustomerSupplyChannelRepository().repo,
            as: "supplyChannel"
        }]
    }
    let oilChartStructures = req.query.oilChartStructures
    if (oilChartStructures != undefined && oilChartStructures != null &&
        oilChartStructures != "" && oilChartStructures != '""' && oilChartStructures != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (oilChartStructures.length != 0) {
            if (!customerInclude.where) {
                customerInclude.where = {}
            }
            customerInclude.where.oilChartStructureId = {
                [Op.eq]: oilChartStructures
            }
        }
    }

    let customerExtraInfoInclude = {
        model: ctx.getCustomerExtraInfoRepository().repo,
        as: "extraInfo"
    }

    customerInclude.include.push(customerExtraInfoInclude)
    options.include.push(customerInclude)
    /*let financialTypeId = req.query.financialTypeId
    if (financialTypeId != undefined && financialTypeId != null &&
        financialTypeId != "" && financialTypeId != "null") {
        options.include.push({
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
            attributes: [],
            where: {
                financialTypeId: financialTypeId
            }
        })
    }*/
    if (order) {
        options.order = order
    }
    options.distinct = true
    if (req.query.fileType===null || (req.query.fileType!=="pdf" && req.query.fileType!=="docx"))
    {
        let items = await ctx.getTransactionRepository().selectList(options, pagination)
        new ResponseService(res, req).send(200, { items, pagination })
    }else{
        let items = await ctx.getTransactionRepository().selectList(options, pagination)
        let content = await TransactionInquiry({
            "report_title":"استعلام پرداخت",
            "items":JSON.parse(JSON.stringify(items))})
        let fileName = makeid(12)

        let fileNameLoc = common.getConfig().file.location+fileName
        fs.writeFileSync(fileNameLoc+".html", content)
        console.log(
            execSync('libreoffice6.4 --convert-to '+req.query.fileType+' '+
                fileNameLoc+".html"+
                '  --writer --headless --norestore --outdir  '+
                common.getConfig().file.location)
                .toString('utf8'));
        new ResponseService(res, req).send(200,
            { "file" : "/reportfile/"+fileName+'.'+req.query.fileType})

    }
}

/**
 *
 * @param ctx
 * @param req
 * @param res
 * @param user
 * @returns {Promise<void>}
 */
async function handleGetReversedTransactions(ctx, req, res, user) {
    let order = req.query.order
    let orderType = (req.query.orderType) ? req.query.orderType : "DESC"
    switch (order) {
        case "sourceName":
            order = [ [{ model: ctx.getTransactionSourceRepository().repo, as: "source" }, 'name', orderType] ]
            break

        case "methodName":
            order = [ [{ model: ctx.getTransactionMethodRepository().repo, as: "method" }, 'name', orderType] ]

        case "customerName":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, 'customerName', orderType] ]
            break

        case "customerType":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerTypeRepository().repo, as: "customerType"}, 'name', orderType] ]
            break

        case "supplyChannel":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerSupplyChannelRepository().repo, as: "supplyChannel"}, 'name', orderType] ]
            break

        case "financialCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'financialCode', orderType] ]
            break

        case "salesCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'salesCode', orderType] ]
            break

        case "stationCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'stationCode', orderType] ]
            break

        default:
            order = undefined
    }
    let generator = ctx.newOptionsGenerator(req)
    generator.addEqual("transactionMethodId", req.query.transactionMethodId)
    generator.addEqual("identifier", req.query.identifier)
    generator.addEqual("amount", req.query.amount)
    generator.addEqual("sourceTransactionId", req.query.sourceTransactionId)
    generator.addEqual("bankAccountId", req.query.bankAccountId)
    generator.addEqual("isValid", true)
    generator.addLikes([ "description" ])
    let { options, pagination } = generator.generateWithPagination()
    options.include = [
        {
            model: ctx.getTransactionMediaRepository().repo,
            as: "media"
        }, {
            model: ctx.getTransactionMethodRepository().repo,
            as: "method"
        }, {
            model: ctx.getTransactionSituationRepository().repo,
            as: "situation"
        }, {
            model: ctx.getTransactionSourceRepository().repo,
            as: "source"
        }, {
            model: ctx.getTransactionTypeRepository().repo,
            as: "type"
        }, {
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
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
        }
    ]
    let customerInclude = {
        model: ctx.getCustomerRepository().repo,
        as: "customer",
        required: true,
        include: [{
            model: ctx.getOilChartStructureRepository().repo,
            as: "oilChartStructure"
        }, {
            model: ctx.getCustomerConcessionaireRepository().repo,
            as: "concessionaire"
        }, {
            model: ctx.getCustomerTypeRepository().repo,
            as: "customerType"
        }, {
            model: ctx.getCustomerSupplyChannelRepository().repo,
            as: "supplyChannel"
        }]
    }
    let oilChartStructures = req.query.oilChartStructures
    if (oilChartStructures != undefined && oilChartStructures != null &&
        oilChartStructures != "" && oilChartStructures != '""' && oilChartStructures != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (oilChartStructures.length != 0) {
            if (!customerInclude.where) {
                customerInclude.where = {}
            }
            customerInclude.where.oilChartStructureId = {
                [Op.eq]: oilChartStructures
            }
        }
    }

    let customerExtraInfoInclude = {
        model: ctx.getCustomerExtraInfoRepository().repo,
        as: "extraInfo"
    }

    customerInclude.include.push(customerExtraInfoInclude)
    options.include.push(customerInclude)

    options.where = {
        '$type.id$': [3, 6]
    }
    if (order) {
        options.order = order
    }
    options.distinct = true
    if (req.query.fileType===null || (req.query.fileType!=="pdf" && req.query.fileType!=="docx"))
    {
        let items = await ctx.getTransactionRepository().selectList(options, pagination)
        new ResponseService(res, req).send(200, { items, pagination })
    }else{
        let items = await ctx.getTransactionRepository().selectList(options, pagination)
        let content = await CorrectiveTransactions({
            "report_title":"تراکنش های اصلاحی",
            "items":JSON.parse(JSON.stringify(items))})
        let fileName = makeid(12)

        let fileNameLoc = common.getConfig().file.location+fileName
        fs.writeFileSync(fileNameLoc+".html", content)
        console.log(
            execSync('libreoffice6.4 --convert-to '+req.query.fileType+' '+
                fileNameLoc+".html"+
                '  --writer --headless --norestore --outdir  '+
                common.getConfig().file.location)
                .toString('utf8'));
        new ResponseService(res, req).send(200,
            { "file" : "/reportfile/"+fileName+'.'+req.query.fileType})
    }
}

/**
 *
 * @param ctx
 * @param req
 * @param res
 * @param user
 * @returns {Promise<void>}
 */
async function handleGetInvalidTransactions(ctx, req, res, user) {
    let order = req.query.order
    let orderType = (req.query.orderType) ? req.query.orderType : "DESC"
    switch (order) {
        case "sourceName":
            order = [ [{ model: ctx.getTransactionSourceRepository().repo, as: "source" }, 'name', orderType] ]
            break

        case "methodName":
            order = [ [{ model: ctx.getTransactionMethodRepository().repo, as: "method" }, 'name', orderType] ]

        case "customerName":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, 'customerName', orderType] ]
            break

        case "customerType":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerTypeRepository().repo, as: "customerType"}, 'name', orderType] ]
            break

        case "supplyChannel":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerSupplyChannelRepository().repo, as: "supplyChannel"}, 'name', orderType] ]
            break

        case "financialCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'financialCode', orderType] ]
            break

        case "salesCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'salesCode', orderType] ]
            break

        case "stationCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'stationCode', orderType] ]
            break

        default:
            order = undefined
    }
    let generator = ctx.newOptionsGenerator(req)
    generator.addEqual("transactionMethodId", req.query.transactionMethodId)
    generator.addEqual("identifier", req.query.identifier)
    generator.addEqual("amount", req.query.amount)
    generator.addEqual("sourceTransactionId", req.query.sourceTransactionId)
    generator.addEqual("bankAccountId", req.query.bankAccountId)
    generator.addEqual("isValid", 0)
    generator.addLikes([ "description" ])
    let { options, pagination } = generator.generateWithPagination()
    options.include = [
        {
            model: ctx.getTransactionMediaRepository().repo,
            as: "media"
        }, {
            model: ctx.getTransactionMethodRepository().repo,
            as: "method"
        }, {
            model: ctx.getTransactionSituationRepository().repo,
            as: "situation"
        }, {
            model: ctx.getTransactionSourceRepository().repo,
            as: "source"
        }, {
            model: ctx.getTransactionTypeRepository().repo,
            as: "type"
        }, {
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
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
        }
    ]
    let customerInclude = {
        model: ctx.getCustomerRepository().repo,
        as: "customer",
        required: true,
        include: [{
            model: ctx.getOilChartStructureRepository().repo,
            as: "oilChartStructure"
        }, {
            model: ctx.getCustomerConcessionaireRepository().repo,
            as: "concessionaire"
        }, {
            model: ctx.getCustomerTypeRepository().repo,
            as: "customerType"
        }, {
            model: ctx.getCustomerSupplyChannelRepository().repo,
            as: "supplyChannel"
        }]
    }
    let oilChartStructures = req.query.oilChartStructures
    if (oilChartStructures != undefined && oilChartStructures != null &&
        oilChartStructures != "" && oilChartStructures != '""' && oilChartStructures != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (oilChartStructures.length != 0) {
            if (!customerInclude.where) {
                customerInclude.where = {}
            }
            customerInclude.where.oilChartStructureId = {
                [Op.eq]: oilChartStructures
            }
        }
    }

    let customerExtraInfoInclude = {
        model: ctx.getCustomerExtraInfoRepository().repo,
        as: "extraInfo"
    }

    customerInclude.include.push(customerExtraInfoInclude)
    options.include.push(customerInclude)

    //options.where = {
     //   '$isValid$': 0
    //}
    if (order) {
        options.order = order
    }
    options.distinct = true
    if (req.query.fileType===null || (req.query.fileType!=="pdf" && req.query.fileType!=="docx"))
    {
        let items = await ctx.getTransactionRepository().selectList(options, pagination)
        new ResponseService(res, req).send(200, { items, pagination })
    }else{
        let items = await ctx.getTransactionRepository().selectList(options, pagination)
        let content = await InvalidCustomerDeposits({
            "report_title":"واریز نامعتبر مشتریان",
            "items":JSON.parse(JSON.stringify(items))})
        let fileName = makeid(12)

        let fileNameLoc = common.getConfig().file.location+fileName
        fs.writeFileSync(fileNameLoc+".html", content)
        console.log(
            execSync('libreoffice6.4 --convert-to '+req.query.fileType+' '+
                fileNameLoc+".html"+
                '  --writer --headless --norestore --outdir  '+
                common.getConfig().file.location)
                .toString('utf8'));
        new ResponseService(res, req).send(200,
            { "file" : "/reportfile/"+fileName+'.'+req.query.fileType})
    }
}

/**
 *
 * @param ctx
 * @param req
 * @param res
 * @param user
 * @returns {Promise<void>}
 */
async function handleGetSystemSummaryAll(ctx, req, res, user) {
    let order = req.query.order
    let orderType = (req.query.orderType) ? req.query.orderType : "DESC"
    switch (order) {
        case "sourceName":
            order = [ [{ model: ctx.getTransactionSourceRepository().repo, as: "source" }, 'name', orderType] ]
            break

        case "methodName":
            order = [ [{ model: ctx.getTransactionMethodRepository().repo, as: "method" }, 'name', orderType] ]

        case "customerName":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, 'customerName', orderType] ]
            break

        case "customerType":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerTypeRepository().repo, as: "customerType"}, 'name', orderType] ]
            break

        case "supplyChannel":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerSupplyChannelRepository().repo, as: "supplyChannel"}, 'name', orderType] ]
            break

        case "financialCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'financialCode', orderType] ]
            break

        case "salesCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'salesCode', orderType] ]
            break

        case "stationCode":
            order = [ [{ model: ctx.getCustomerRepository().repo, as: "customer" }, {model: ctx.getCustomerExtraInfoRepository().repo, as: "extraInfo"}, 'stationCode', orderType] ]
            break

        default:
            order = undefined
    }
    let generator = ctx.newOptionsGenerator(req)
    generator.addEqual("transactionMethodId", req.query.transactionMethodId)
    generator.addEqual("identifier", req.query.identifier)
    generator.addEqual("amount", req.query.amount)
    generator.addEqual("sourceTransactionId", req.query.sourceTransactionId)
    generator.addEqual("bankAccountId", req.query.bankAccountId)
    generator.addEqual("isValid", true)
    generator.addLikes([ "description" ])
    let { options, pagination } = generator.generateWithPagination()
    options.include = [
        /*{
            model: ctx.getTransactionMediaRepository().repo,
            as: "media"
        }, {
            model: ctx.getTransactionMethodRepository().repo,
            as: "method"
        }, {
            model: ctx.getTransactionSituationRepository().repo,
            as: "situation"
        }, {
            model: ctx.getTransactionSourceRepository().repo,
            as: "source"
        },*/ {
            model: ctx.getTransactionTypeRepository().repo,
            as: "type"
        }, {
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
            include: [
                {
                    model: ctx.getBankAccountTypeRepository().repo,
                    as: "accountType"
                },/*{
                    model: ctx.getBankAccountFinancialTypeRepository().repo,
                    as: "financialType"
                },

                {
                    model: ctx.getBankRepository().repo,
                    as: "bank"
                }*/
            ]
        }
    ]
    let customerInclude = {
        model: ctx.getCustomerRepository().repo,
        as: "customer",
        required: true,
        include: [{
            model: ctx.getOilChartStructureRepository().repo,
            as: "oilChartStructure"
        }, {
            model: ctx.getCustomerConcessionaireRepository().repo,
            as: "concessionaire"
        }, {
            model: ctx.getCustomerTypeRepository().repo,
            as: "customerType"
        }, {
            model: ctx.getCustomerSupplyChannelRepository().repo,
            as: "supplyChannel"
        }]
    }
    let oilChartStructures = req.query.oilChartStructures
    if (oilChartStructures != undefined && oilChartStructures != null &&
        oilChartStructures != "" && oilChartStructures != '""' && oilChartStructures != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (oilChartStructures.length != 0) {
            if (!customerInclude.where) {
                customerInclude.where = {}
            }
            customerInclude.where.oilChartStructureId = {
                [Op.eq]: oilChartStructures
            }
        }
    }
    let financialTypeId = req.query.financialTypeId
    if (financialTypeId != undefined && financialTypeId != null &&
        financialTypeId != "" && financialTypeId != '""' && financialTypeId != "null") {
        //oilChartStructures = oilChartStructures.split(",")
        if (!options.where) {
            options.where = {}
        }
        options.where = {
            '$bankAccount.financialType.id$': financialTypeId
        }

    }
    /**
     * Get only valid transactions
     * @type {{$is_valid$: boolean}}
     */
    options.where = {
        '$is_valid$': true
    }

    let customerExtraInfoInclude = {
        //model: ctx.getCustomerExtraInfoRepository().repo,
        //as: "extraInfo"
    }

    //customerInclude.include.push(customerExtraInfoInclude)
    //options.include.push(customerInclude)
    /*let financialTypeId = req.query.financialTypeId
    if (financialTypeId != undefined && financialTypeId != null &&
        financialTypeId != "" && financialTypeId != "null") {
        options.include.push({
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccount",
            attributes: [],
            where: {
                financialTypeId: financialTypeId
            }
        })
    }*/
    if (order) {
        options.order = order
    }
    options.distinct = true
    let timeFrom = req.query.timeFrom
    let timeTo = req.query.timeTo

    delete options.limit;

    //console.log(options)
    //console.log("first")
    let obj={};
    let arr = {
        "SetadRegionAreaTransactions": {"Count":0,"Sum":0},
        "OtherTransactions": {"Count":0,"Sum":0},
        "CustomerTransactions": {"Count":0,"Sum":0},
        "MechanizedTransactions": {"Count":0,"Sum":0},
        "Sum": {"Count":0,"Sum":0}
    };
    obj['Dates']={}
    obj['Stats']={'Setad':0,'Region':0,'Area':0,'Customers':0,'Users':0}
    obj['TotalSum'] ={
        "Setad":{
            "AccountCount":0,
            "IncreasingTransactionCount":0,
            "IncreasingTransactionSum":0,
            "DecreasingTransactionCount":0,
            "DecreasingTransactionSum":0
        },
        "Region":{
            "AccountCount":0,
            "IncreasingTransactionCount":0,
            "IncreasingTransactionSum":0,
            "DecreasingTransactionCount":0,
            "DecreasingTransactionSum":0
        },
        "Area":{
            "AccountCount":0,
            "IncreasingTransactionCount":0,
            "IncreasingTransactionSum":0,
            "DecreasingTransactionCount":0,
            "DecreasingTransactionSum":0
        },
        "Public":{
            "AccountCount":0,
            "IncreasingTransactionCount":0,
            "IncreasingTransactionSum":0,
            "DecreasingTransactionCount":0,
            "DecreasingTransactionSum":0
        },
        "Corporate":{
            "AccountCount":0,
            "IncreasingTransactionCount":0,
            "IncreasingTransactionSum":0,
            "DecreasingTransactionCount":0,
            "DecreasingTransactionSum":0
        },
        "CorporateContractor":{
            "AccountCount":0,
            "IncreasingTransactionCount":0,
            "IncreasingTransactionSum":0,
            "DecreasingTransactionCount":0,
            "DecreasingTransactionSum":0
        },
        "GrandTotal":{
            "AccountCount":0,
            "IncreasingTransactionCount":0,
            "IncreasingTransactionSum":0,
            "DecreasingTransactionCount":0,
            "DecreasingTransactionSum":0
        },
    };
    //loop
    for (let m = moment.unix(Math.floor(timeFrom/1000)); m.isBefore(moment.unix(Math.floor(timeTo/1000))); m.add(1, 'days')) {
        //console.log(m.format('YYYY-MM-DD'));
    }

    if (timeFrom != null || timeTo != null) {
        options.where.lastChangeStatusDate = {}
        if (timeFrom != null) {
            options.where.lastChangeStatusDate[Op.gte] = moment.unix(Math.floor(timeFrom/1000)).toDate()
        }
        if (timeTo != null) {
            options.where.lastChangeStatusDate[Op.lte] = moment.unix(Math.floor(timeTo/1000)).add(1,'days').toDate()
        }
    }
    options.attributes = ['type.*','amount']
    let items = await ctx.getTransactionRepository().selectList(options)
    //console.log(options)
    //console.log(items)

    for (const item of items ){
        let SourcecreatedAtJalali = moment(item.sourceCreatedAt).format('jYYYYjMMjDD',{ trim: false });
        /**
         * Check if item in this date already exists, If not and transaction type is of increase, create one.
         *
         */
        if(obj['Dates'][SourcecreatedAtJalali] === undefined && item.type.effect==='increase'){
            //console.log(item.bankAccount.accountNumber)
            obj['Dates'][SourcecreatedAtJalali] = {
                "SetadRegionAreaTransactions": {"Count":0,"Sum":0},
                "OtherTransactions": {"Count":0,"Sum":0},
                "CustomerTransactions": {"Count":0,"Sum":0},
                "MechanizedTransactions": {"Count":0,"Sum":0},
                "Sum": {"Count":0,"Sum":0}
            }
        }
        /**
         * First Table Begin
         */
        // Setad
        if (item.bankAccount.accountType.id===2)
        {
            if(item.type.effect==='decrease')
            {
                obj['TotalSum'].Setad.DecreasingTransactionCount++;
                obj['TotalSum'].Setad.DecreasingTransactionSum += item.amount;
            }
            else
            {
                obj['TotalSum'].Setad.IncreasingTransactionCount++;
                obj['TotalSum'].Setad.IncreasingTransactionSum += item.amount;
            }
        }
        // Region // Mantaghe
        else if (item.bankAccount.accountType.id===3)
        {
            if(item.type.effect==='decrease')
            {
                obj['TotalSum'].Region.DecreasingTransactionCount++;
                obj['TotalSum'].Region.DecreasingTransactionSum += item.amount;
            }
            else
            {
                obj['TotalSum'].Region.IncreasingTransactionCount++;
                obj['TotalSum'].Region.IncreasingTransactionSum += item.amount;
            }
        }
        // Area // Nahye
        else if (item.bankAccount.accountType.id===4)
        {
            if(item.type.effect==='decrease')
            {
                obj['TotalSum'].Area.DecreasingTransactionCount++;
                obj['TotalSum'].Area.DecreasingTransactionSum += item.amount;
            }
            else
            {
                obj['TotalSum'].Area.IncreasingTransactionCount++;
                obj['TotalSum'].Area.IncreasingTransactionSum += item.amount;
            }
        }
        // Corporate // Jaygahe Sherkati
        else if (item.bankAccount.accountType.id===5)
        {
            if(item.type.effect==='decrease')
            {
                obj['TotalSum'].Corporate.DecreasingTransactionCount++;
                obj['TotalSum'].Corporate.DecreasingTransactionSum += item.amount;
            }
            else
            {
                obj['TotalSum'].Corporate.IncreasingTransactionCount++;
                obj['TotalSum'].Corporate.IncreasingTransactionSum += item.amount;
            }
        }
        // Corporate Contractor // Peymankare Jaygahe sherkati
        else if (item.bankAccount.accountType.id===6)
        {
            if(item.type.effect==='decrease')
            {
                obj['TotalSum'].CorporateContractor.DecreasingTransactionCount++;
                obj['TotalSum'].CorporateContractor.DecreasingTransactionSum += item.amount;
            }
            else
            {
                obj['TotalSum'].CorporateContractor.IncreasingTransactionCount++;
                obj['TotalSum'].CorporateContractor.IncreasingTransactionSum += item.amount;
            }
        }
        // Public \\ Omumi
        else if (item.bankAccount.accountType.id===1)
        {
            if(item.type.effect==='decrease')
            {
                obj['TotalSum'].Public.DecreasingTransactionCount++;
                obj['TotalSum'].Public.DecreasingTransactionSum += item.amount;
            }
            else
            {
                obj['TotalSum'].Public.IncreasingTransactionCount++;
                obj['TotalSum'].Public.IncreasingTransactionSum += item.amount;
            }
        }
        /**
         * Calculating Sum of all Transactions in First Table
         * BEGIN
         */
        if(item.type.effect==='decrease')
        {
            obj['TotalSum'].GrandTotal.DecreasingTransactionCount++;
            obj['TotalSum'].GrandTotal.DecreasingTransactionSum += item.amount;
        }
        else
        {
            obj['TotalSum'].GrandTotal.IncreasingTransactionCount++;
            obj['TotalSum'].GrandTotal.IncreasingTransactionSum += item.amount;
        }
        /**
         * Calculating Sum of all Transactions in First Table
         * END
         */

        /**
         * First Table End
         */


        /**
         * Third Table Begin
         */
        if(item.type.effect==='increase')
        {
            /**
             * Omumi/Setad/Mantaghe/Nahye are part of first column of third table
             */
            if (item.bankAccount.accountType.id ===2 || item.bankAccount.accountType.id ===3
                || item.bankAccount.accountType.id ===4 || item.bankAccount.accountType.id ===1){
                obj['Dates'][SourcecreatedAtJalali].SetadRegionAreaTransactions.Count++;
                obj['Dates'][SourcecreatedAtJalali].SetadRegionAreaTransactions.Sum+=item.amount;
            }
            /**
             * Sherkati/PeymankarSherkati are part og the customer(this column) of third table
             */
            else if (item.bankAccount.accountType.id ===5 || item.bankAccount.accountType.id ===6){
                obj['Dates'][SourcecreatedAtJalali].CustomerTransactions.Count++;
                obj['Dates'][SourcecreatedAtJalali].CustomerTransactions.Sum+=item.amount;
            }

            obj['Dates'][SourcecreatedAtJalali].Sum.Count++;
            obj['Dates'][SourcecreatedAtJalali].Sum.Sum += item.amount;
        }


        /**
         * End Third Table
         */
    }

    /**
     * Second Table Begin
     */

    let secondTable = await ctx.getOilChartStructureRepository().selectList({
        attributes: [
            'level',
            [Sequelize.fn('COUNT', Sequelize.col('level')), 'id']
            ],
        group: ['level']
    })
    for (itm of secondTable){
        if(itm.level===0)
            obj['Stats'].Setad = itm.id
        else if(itm.level===1)
            obj['Stats'].Region = itm.id
        else if(itm.level===2)
            obj['Stats'].Area = itm.id
    }
    /**
     * Second Table End
     */
    new ResponseService(res, req).send(200, obj )
}

module.exports = {
    handleGetAll,
    handleGetById,
    handleGetRegionAll,
    handleGetAreaAll,
    handleCheckIfTransactionExists,
    handleGetReversedTransactions,
    handleGetInvalidTransactions,
    handleGetAreaTurnOverAll,
    handleGetRegionTurnOverAll,
    handleGetSystemSummaryAll
}
