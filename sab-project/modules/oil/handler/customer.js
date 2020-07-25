const {customerList, makeid} =require("./template");

const express = require("express")
const { Context } = require("../../../context/context")
const { ConflictError } = require("../../../models/error")
const { AddCustomerValidator } = require("../validator/add_customer")
const { EditCustomerValidator } = require("../validator/edit_customer")
const ResponseService = require('../../../services/ResponseService')
const { Op } = require("sequelize")
const execSync = require('child_process').execSync;
const fs = require('fs')

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
    generator.addEqual("customerTypeId", req.query.customerTypeId)
    generator.addEqual("usageTypeId", req.query.usageTypeId)
    generator.addEqual("depositId", req.query.depositId)
    generator.addLikes(["customerName"])
    let { options, pagination } = generator.generateWithPagination()
    options.distinct = true
    options.include = [{
        model: ctx.getCustomerTypeRepository().repo,
        as: "customerType"
    }, {
        model: ctx.getCustomerUsageTypeRepository().repo,
        as: "usageType"
    }, {
        model: ctx.getCustomerSupplyChannelRepository().repo,
        as: "supplyChannel"
    }, {
        model: ctx.getCustomerConcessionaireRepository().repo,
        as: "concessionaire"
    }, {
        model: ctx.getCustomerGroupRepository().repo,
        as: "group"
    }, {
        model: ctx.getBankAccountRepository().repo,
        as: "bankAccounts",
        include: [
            {
                model: ctx.getBankAccountFinancialTypeRepository().repo,
                as: "financialType"
            }, {
                model: ctx.getBankAccountTypeRepository().repo,
                as: "accountType"
            }, {
                model: ctx.getBankRepository().repo,
                as: "bank"
            }
        ]
    }, {
        model: ctx.getCustomerContractorRepository().repo,
        as: "contractor",
        include: [
            {
                model: ctx.getBankAccountRepository().repo,
                through: ctx.getSequelizeModel("bankAccounts"),
                as: "bankAccounts"
            }
        ]
    }]
    let oilChartStructureInclude = {
        model: ctx.getOilChartStructureRepository().repo,
        as: "oilChartStructure"
    }
    let oilChartStructureId = req.query.oilChartStructureId
    if (oilChartStructureId != undefined && oilChartStructureId != null &&
        oilChartStructureId != "null" && oilChartStructureId != "") {
        oilChartStructureInclude.where = {
            [Op.or]: [
                {
                    id: oilChartStructureId
                },
                {
                    parentId: oilChartStructureId
                }
            ]
        }
    }
    options.include.push(oilChartStructureInclude)
    let extraInfoInclude = {
        model: ctx.getCustomerExtraInfoRepository().repo,
        as: "extraInfo",
    }
    let financialCode = req.query.financialCode
    if (financialCode != undefined && financialCode != null &&
        financialCode != "null" && financialCode != "") {
            if (!extraInfoInclude.where) extraInfoInclude.where = {}
            extraInfoInclude.where.financialCode = financialCode
    }
    let salesCode = req.query.salesCode
    if (salesCode != undefined && salesCode != null &&
        salesCode != "null" && salesCode != "") {
            if (!extraInfoInclude.where) extraInfoInclude.where = {}
            extraInfoInclude.where.salesCode = salesCode
    }
    options.include.push(extraInfoInclude)
    if (req.query.fileType===null || (req.query.fileType!=="pdf" && req.query.fileType!=="docx"))
    {
        let items = await ctx.getCustomerRepository().selectList(options, pagination)
        new ResponseService(res, req).send(200, { items, pagination })
    }
    else{
        let items = await ctx.getCustomerRepository().selectList(options)
        let content = await customerList({"report_title":"لیست مشتریان", "items":JSON.parse(JSON.stringify(items))})
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
async function handleGetById(ctx, req, res) {
    let id = req.params.id
    let result = await ctx.getCustomerRepository().selectById(id, null, {
        include: [{
            model: ctx.getOilChartStructureRepository().repo,
            as: "oilChartStructure"
        }, {
            model: ctx.getCustomerTypeRepository().repo,
            as: "customerType"
        }, {
            model: ctx.getCustomerUsageTypeRepository().repo,
            as: "usageType"
        }, {
            model: ctx.getCustomerSupplyChannelRepository().repo,
            as: "supplyChannel"
        }, {
            model: ctx.getCustomerConcessionaireRepository().repo,
            as: "concessionaire"
        }, {
            model: ctx.getCustomerGroupRepository().repo,
            as: "group"
        }, {
            model: ctx.getCustomerExtraInfoRepository().repo,
            as: "extraInfo"
        }, {
            model: ctx.getBankAccountRepository().repo,
            as: "bankAccounts",
            include: [
                {
                    model: ctx.getBankAccountFinancialTypeRepository().repo,
                    as: "financialType"
                }, {
                    model: ctx.getBankAccountTypeRepository().repo,
                    as: "accountType"
                }, {
                    model: ctx.getBankRepository().repo,
                    as: "bank"
                }
            ]
        }, {
            model: ctx.getCustomerContractorRepository().repo,
            as: "contractor",
            include: [
                {
                    model: ctx.getBankAccountRepository().repo,
                    as: "bankAccounts"
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
    await new AddCustomerValidator().validate(req.body)
    if (!req.body.flagId) {
        req.body.flagId = 1
    }
    let customer = req.body
    let refChartStructure = await ctx.getOilChartStructureRepository().
        selectById(customer.oilChartStructureId)
    if (refChartStructure == null || refChartStructure == undefined) {
        throw new ConflictError("there is no oilChartStructure with this oilChartStructureId")
    }
    let refConcessionaire
    if (customer.concessionaire) {
        refConcessionaire = await ctx.getCustomerConcessionaireRepository().insert(customer.concessionaire)
        if (refConcessionaire.id) {
            customer.concessionaireId = refConcessionaire.id
        }
    }
    if (customer.customerTypeId == 8 && customer.contractorBankAccountId) {
        let bankAccounts = await ctx.getBankAccountRepository().selectList({
            where: {
                id: customer.contractorBankAccountId
            },
            include: [
                {
                    model: ctx.getCustomerContractorRepository().repo,
                    as: "customerContractors"
                }
            ]
        })
        if (bankAccounts == null || bankAccounts == undefined || bankAccounts.length != 1) {
            throw new ConflictError("there is no bankAccount with this contractorBankAccountId")
        }
        let bankAccount = bankAccounts[0]
        let contractor
        if (bankAccount.customerContractors == null ||
            bankAccount.customerContractors == undefined ||
            bankAccount.customerContractors.length < 1) {
                let body = {
                    name: bankAccount.ownerName,
                    oilChartStructureId: (refChartStructure.parentId) ? refChartStructure.parentId : refChartStructure.id,
                    flagId: 1
                }
                contractor = await ctx.getCustomerContractorRepository().insert(body)
                await contractor.setBankAccounts([ bankAccount ])
            } else {
                contractor = bankAccount.customerContractors[0]
            }
        customer.contractorId = contractor.id
    }
    let result = await ctx.getCustomerRepository().insert(customer, {
        include: [{
            model: ctx.getSequelizeModel("customerExtraInfo"),
            as: "extraInfo"
        }]
    })
    if (customer.customerTypeId == 8 && customer.bankAccounts != undefined && customer.bankAccounts != null && customer.bankAccounts.length != 0) {
        let bankAccounts = await ctx.getBankAccountRepository().selectList({
            where: {
                id: customer.bankAccounts
            },
            attributes:["id"]
        })
        await result.setBankAccounts(bankAccounts)
    }
    result.dataValues.concessionaire = refConcessionaire
    new ResponseService(res, req).send(201, result)
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res 
 */
async function handlePatch(ctx, req, res) {
    await new EditCustomerValidator().validate(req.body)
    let customer = req.body
    let id = req.params.id
    let refCustomer = await ctx.getCustomerRepository().selectById(id, null, {
        include: [
            {
                model: ctx.getOilChartStructureRepository().repo,
                as: "oilChartStructure"
            }
        ]
    })
    if (refCustomer == undefined || refCustomer == null) {
        throw new ConflictError("there is no customer with this customerId")
    }
    if (customer.customerTypeId == 8 && customer.contractorBankAccountId) {
        let bankAccounts = await ctx.getBankAccountRepository().selectList({
            where: {
                id: customer.contractorBankAccountId
            },
            include: [
                {
                    model: ctx.getCustomerContractorRepository().repo,
                    as: "customerContractors"
                }
            ]
        })
        if (bankAccounts == null || bankAccounts == undefined || bankAccounts.length != 1) {
            throw new ConflictError("there is no bankAccount with this contractorBankAccountId")
        }
        let bankAccount = bankAccounts[0]
        let contractor
        if (bankAccount.customerContractors == null ||
            bankAccount.customerContractors == undefined ||
            bankAccount.customerContractors.length < 1) {
                let oilChartStructure = refCustomer.oilChartStructure
                if (!oilChartStructure) {
                    oilChartStructure = { parentId: 1 }
                }
                let body = {
                    name: bankAccount.ownerName,
                    oilChartStructureId: (oilChartStructure.parentId) ? oilChartStructure.parentId : oilChartStructure.id,
                    flagId: 1
                }
                contractor = await ctx.getCustomerContractorRepository().insert(body)
                await contractor.setBankAccounts([ bankAccount ])
            } else {
                contractor = bankAccount.customerContractors[0]
            }
        customer.contractorId = contractor.id
    }
    let result = await ctx.getCustomerRepository().update(customer, {
        where: { id }
    })
    if (customer.extraInfo != undefined && customer.extraInfo != null) {
        let refExtraInfo = await ctx.getCustomerExtraInfoRepository().selectList({
            where: {
                customerId: refCustomer.id
            }
        })
        if (refExtraInfo && refExtraInfo.length != 0) {
            refExtraInfo = refExtraInfo[0]
            if (refExtraInfo) {
                let extraInfo = customer.extraInfo
                extraInfo.id = refExtraInfo.id
                extraInfo.customerId = refExtraInfo.customerId
                await ctx.getCustomerExtraInfoRepository().update(extraInfo, { where: { id: refExtraInfo.id }})
            }
        }
    }
    if (customer.customerTypeId == 8 && customer.bankAccounts != undefined && customer.bankAccounts != null && customer.bankAccounts.length != 0) {
        let bankAccounts = await ctx.getBankAccountRepository().selectList({
            where: {
                id: customer.bankAccounts
            },
            attributes:["id"]
        })
        await refCustomer.setBankAccounts(bankAccounts)
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
    await ctx.getCustomerRepository().logicalDelete(id)
    new ResponseService(res, req).send(200, {})
}

module.exports = {
    handleGetAll,
    handleGetById,
    handlePost,
    handlePatch,
    handleDelete
}
