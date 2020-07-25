const express = require("express")
const { Context } = require("../../../context/context")
const { Sequelize, Op } = require("sequelize")
const { AddBankAccountValidator } = require("../validator/add_bank_account")
const { EditBankAccountValidator } = require("../validator/edit_bank_account")
const ResponseService = require('../../../services/ResponseService')
const execSync = require('child_process').execSync;
const {bankAccountList,AccountsWithoutCheque, makeid} = require("./template");
const fs = require('fs')

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
        case "financialType":
            order = [ [{ model: ctx.getBankAccountFinancialTypeRepository().repo, as: "financialType" }, 'name', orderType] ]
            break

        default:
            order = undefined
    }
    let generator = ctx.newOptionsGenerator(req)
    generator.addNotEqual("situationId", 3)
    generator.addEqual("situationId", req.query.situationId)
    let accountTypeId = req.query.accountTypeId
    if (accountTypeId) {
        let value
        switch (accountTypeId) {
            case "HQ":
                value = 2
                break;
            case "RG":
                value = 3
                break;
            case "AR":
                value = 4
                break;
            case "CT":
                value = 5
                break;
            default:
                value = accountTypeId
        }
        if (value) {
            generator.addEqual("accountTypeId", value)
        }
    }
    let { options, pagination } = generator.generateWithPagination()
    if (req.query.name) {
        if (!options.where[Op.or]) {
            options.where[Op.or] = []
        }
        options.where[Op.or].push({
            accountNumber: req.query.name
        })
    }
    if (req.query.name) {
        if (!options.where[Op.or]) {
            options.where[Op.or] = []
        }
        options.where[Op.or].push({
            ownerName: {
                [Op.like] : `%${req.query.name}%`
            }
        })
    }
    options.include = [
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
    let oilChartStructureId = req.query.oilChartStructureId
    if (oilChartStructureId) {
        options.include.push({
            model: ctx.getOilChartStructureRepository().repo,
            as: "chartStructures",
            where: Sequelize.or({ id: oilChartStructureId }, { parentId: oilChartStructureId })
        })
    }
    if (order) {
        options.order = order
    }
    options.distinct = true
    if (req.query.notAssigned) {
        options.where = {
            [Op.and]: [
                {
                    id: {
                        [Op.notIn]: Sequelize.literal("(select bank_account_id as id from oil_chart_structure_bank_accounts)")
                    }
                }, {
                    id: {
                        [Op.notIn]: Sequelize.literal("(select bank_account_id as id from customer_bank_accounts)")
                    }
                }, {
                    id: {
                        [Op.notIn]: Sequelize.literal("(select bank_account_id as id from customer_contractor_bank_accounts)")
                    }
                },
            ]
        }
    }
    if (req.query.fileType===null || (req.query.fileType!=="pdf" && req.query.fileType!=="docx"))
    {
        let items = await ctx.getBankAccountRepository().selectList(options, pagination)
        new ResponseService(res, req).send(200, { items, pagination })
    }else {
        let items = await ctx.getBankAccountRepository().selectList(options)
        let content = await bankAccountList({"report_title":"لیست حساب ها","items":JSON.parse(JSON.stringify(items))})
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
async function handleGetAccountsWithoutCheque(ctx, req, res, user) {
    let order = req.query.order
    let orderType = (req.query.orderType) ? req.query.orderType : "DESC"
    switch (order) {
        case "financialType":
            order = [ [{ model: ctx.getBankAccountFinancialTypeRepository().repo, as: "financialType" }, 'name', orderType] ]
            break

        default:
            order = undefined
    }
    let generator = ctx.newOptionsGenerator(req)
    generator.addNotEqual("situationId", 3)
    generator.addEqual("situationId", req.query.situationId)
    let accountTypeId = req.query.accountTypeId
    if (accountTypeId) {
        let value
        switch (accountTypeId) {
            case "HQ":
                value = 2
                break;
            case "RG":
                value = 3
                break;
            case "AR":
                value = 4
                break;
            case "CT":
                value = 5
                break;
            default:
                value = accountTypeId
        }
        if (value) {
            generator.addEqual("accountTypeId", value)
        }
    }
    generator.addEqual("hasChequePermission", 0)
    let { options, pagination } = generator.generateWithPagination()

    options.include = [
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
    let oilChartStructureId = req.query.oilChartStructureId
    if (oilChartStructureId) {
        options.include.push({
            model: ctx.getOilChartStructureRepository().repo,
            as: "chartStructures",
            where: Sequelize.or({ id: oilChartStructureId }, { parentId: oilChartStructureId })
        })
    }
    if (order) {
        options.order = order
    }
    options.distinct = true
    if (req.query.notAssigned) {
        options.where = {
            [Op.and]: [
                {
                    id: {
                        [Op.notIn]: Sequelize.literal("(select bank_account_id as id from oil_chart_structure_bank_accounts)")
                    }
                }, {
                    id: {
                        [Op.notIn]: Sequelize.literal("(select bank_account_id as id from customer_bank_accounts)")
                    }
                }, {
                    id: {
                        [Op.notIn]: Sequelize.literal("(select bank_account_id as id from customer_contractor_bank_accounts)")
                    }
                },
            ]
        }
    }
    if (req.query.fileType===null || (req.query.fileType!=="pdf" && req.query.fileType!=="docx"))
    {
        let items = await ctx.getBankAccountRepository().selectList(options, pagination)
        new ResponseService(res, req).send(200, { items, pagination })

    }else{
        let items = await ctx.getBankAccountRepository().selectList(options, pagination)
        let content = await AccountsWithoutCheque({"report_title":"حسابهای بدون مجوز دسته چک","items":JSON.parse(JSON.stringify(items))})
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
    let result = await ctx.getBankAccountRepository().selectById(id, null, {
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
    })
    new ResponseService(res, req).send(200, result)
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handleRegionBankAccounts(ctx, req, res) {
    let regionId = req.params.id
    let order = req.query.order
    let orderType = (req.query.orderType) ? req.query.orderType : "DESC"
    switch (order) {
        case "financialType":
            order = [ [{ model: ctx.getBankAccountFinancialTypeRepository().repo, as: "financialType" }, 'name', orderType] ]
            break

        default:
            order = undefined
    }
    let generator = ctx.newOptionsGenerator(req)
    generator.addEqual("situationId", (req.query.situationId) ? (req.query.situationId) : 1)
    generator.addLikes(["ownerName"])
    let accountTypeId = req.query.accountTypeId
    if (accountTypeId) {
        let value
        switch (accountTypeId) {
            case "HQ":
                value = 2
                break;
            case "RG":
                value = 3
                break;
            case "AR":
                value = 4
                break;
            case "CT":
                value = 5
                break;
        }
        if (value) {
            generator.addEqual("accountTypeId", value)
        }
    }
    let { options, pagination } = generator.generateWithPagination()
    options.include = [
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
        },
        {
            model: ctx.getOilChartStructureRepository().repo,
            as: "chartStructures",
            where: Sequelize.or({ id: regionId }, { parentId: regionId })
        }
    ]
    if (order) {
        options.order = order
    }
    options.distinct = true
    if (req.query.fileType===null || (req.query.fileType!=="pdf" && req.query.fileType!=="docx"))
    {
        let items = await ctx.getBankAccountRepository().selectList(options, pagination)
        new ResponseService(res, req).send(200, { items, pagination })

    }else{
        let items = await ctx.getBankAccountRepository().selectList(options, pagination)
        let content = await ({"report_title":"لیست حساب ها","items":JSON.parse(JSON.stringify(items))})
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
async function handlePost(ctx, req, res) {
    await new AddBankAccountValidator().validate(req.body)
    if (!req.body.flagId) {
        req.body.flagId = 1
    }
    let bank = req.body
    bank.situationId = 1
    let result = await ctx.getBankAccountRepository().insert(bank)
    new ResponseService(res, req).send(201, result)
}

/**
 * 
 * @param {Context} ctx 
 * @param {express.request} req 
 * @param {express.response} res  
 */
async function handlePatch(ctx, req, res) {
    await new EditBankAccountValidator().validate(req.body)
    let bank = req.body
    let id = req.params.id
    let refBankAccount = await ctx.getBankAccountRepository().selectById(id)
    if (refBankAccount == undefined || refBankAccount == null) {
        throw new ConflictError("there is no bankAccount with this id")
    }
    let result = await ctx.getBankAccountRepository().update(bank, {
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
    await ctx.getBankAccountRepository().update({
        situationId: 3
    }, {
        where: { id }
    })
    new ResponseService(res, req).send(200, {})
}

module.exports = {
    handleGetAll,
    handleGetById,
    handleGetAccountsWithoutCheque,
    handleRegionBankAccounts,
    handlePost,
    handlePatch,
    handleDelete
}
