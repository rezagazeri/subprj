const Joi = require('@hapi/joi')
const { Validator } = require("../../../utils/validator")

const schema = Joi.object({
    accountNumber: Joi.string().required(),
    bankId: Joi.number().required(),
    ownerName: Joi.string().min(1).max(32).required(),
    hasChequePermission: Joi.boolean().required(),
    financialTypeId: Joi.number().required(),
    accountTypeId: Joi.string().min(1).max(32).required(),
    headquarterConfirmation: Joi.boolean().required(),
    bankConfirmation: Joi.boolean().required(),
    flagId: Joi.number()
})

class AddBankAccountValidator extends Validator {

    constructor() {
        super(schema)
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
            case "accountNumber":
                message = "شماره حساب"
                break

            case "bankId":
                message = "بانک"
                break

            case "ownerName":
                message = "نام صاحب حساب"
                break

            case "hasChequePermission":
                message = "مجوز دسته چک"
                break
            
            case "financialTypeId":
                message = "نوع مالی"
                break

            case "accountTypeId":
                message = "نوع حساب"
                break
            
            case "headquarterConfirmation":
                message = "تایید ستاد"
                break

            case "bankConfirmation":
                message = "تایید بانک"
                break

            default:
                message = super._getAliasName(field, err)
                break
        }
        return message
    }
}

module.exports = {
    AddBankAccountValidator
}
