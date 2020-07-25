const Joi = require('@hapi/joi')
const { AddBankAccountValidator } = require ("./add_bank_account")

const schema = Joi.object({
    accountNumber: Joi.string(),
    bankId: Joi.number(),
    ownerName: Joi.string().min(1).max(32),
    hasChequePermission: Joi.boolean(),
    financialTypeId: Joi.number(),
    accountTypeId: Joi.string().min(1).max(32),
    headquarterConfirmation: Joi.boolean(),
    bankConfirmation: Joi.boolean(),
    flagId: Joi.number(),
})

class EditBankAccountValidator extends AddBankAccountValidator {

    constructor() {
        this.schema = schema
    }
}

module.exports = {
    EditBankAccountValidator
}
