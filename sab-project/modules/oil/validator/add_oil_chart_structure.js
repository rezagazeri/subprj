const Joi = require('@hapi/joi')
const { Validator } = require("../../../utils/validator")

/**
 * @typedef {import("../../../models/oil_chart_structure").OilChartStructure} OilChartStructure
 */

const headquarterSchema = Joi.object({
    name: Joi.string().min(1).max(32).required(),
    email: Joi.string().email().min(1).max(32),
    financialCode: Joi.string().min(1).max(32).required(),
    salesCode: Joi.string().min(1).max(32).required(),
    depositId: Joi.string().min(1).max(32).required(),
    flagId: Joi.number(),
    publicDepositId: Joi.string().min(1).max(32).required(),
    bankAccounts: Joi.array().min(0).max(50)
})

const regionSchema = Joi.object({
    name: Joi.string().min(1).max(32).required(),
    email: Joi.string().email().min(1).max(32),
    financialCode: Joi.string().min(1).max(32),
    salesCode: Joi.string().min(1).max(32),
    depositId: Joi.string().min(1).max(32).required(),
    flagId: Joi.number(),
    parentId: Joi.number().required(),
    publicDepositId: Joi.string().min(1).max(32).required(),
    bankAccounts: Joi.array().min(0).max(50)
})

class AddOilChartStructureValidator extends Validator {

    /**
     * 
     * @param {OilChartStructureType} oilChartStructureType 
     */
    constructor(oilChartStructureType) {
        super((oilChartStructureType == 1) ? headquarterSchema : regionSchema)
        this.oilChartStructureType = oilChartStructureType
    }

    /**
     * 
     * @param {string} field 
     * @param {JoiError} err 
     * @returns {string}
     */
    _getAliasName(field, err) {
        let message
        switch (field) {
            case "name":
                message = "نام"
                break

            case "email":
                message = "رایانامه"
                break
            
            case "financialCode":
                message = "کد مالی"
                break

            case "salesCode":
                message = "کد فروش"
                break

            case "depositId":
                message = "شناسه واریز"
                break

            case "publicDepositId":
                message = "شناسه واریز عمومی"
                break

            default:
                message = super._getAliasName(field, err)
                break
        }
        if (field.startsWith("bankAccounts")) {
            message = "حساب های بانکی"
        }
        return message
    }
}

module.exports = {
    AddOilChartStructureValidator
}
