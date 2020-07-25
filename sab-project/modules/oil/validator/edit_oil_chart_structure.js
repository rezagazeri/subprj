const Joi = require('@hapi/joi')
const { AddOilChartStructureValidator } = require ("./add_oil_chart_structure")

/**
 * @typedef {import("../../../models/oil_chart_structure").OilChartStructure} OilChartStructure
 */

const schema = Joi.object({
    name: Joi.string().min(1).max(32),
    email: Joi.string().email().min(1).max(32),
    financialCode: Joi.string().min(1).max(32),
    salesCode: Joi.string().min(1).max(32),
    depositId: Joi.string().min(1).max(32),
    flagId: Joi.number(),
    publicDepositId: Joi.string().min(1).max(32),
    bankAccounts: Joi.array().min(0).max(50)
})

class EditOilChartStructureValidator extends AddOilChartStructureValidator {

    /**
     * 
     * @param {OilChartStructureType} oilChartStructureType 
     */
    constructor(oilChartStructureType) {
        super(oilChartStructureType)
        this.schema = schema
    }
}

module.exports = {
    EditOilChartStructureValidator
}
