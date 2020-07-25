const Joi = require('@hapi/joi')
const { AddCustomerValidator } = require ("./add_customer")
const schema = Joi.object({
  oilChartStructureId: Joi.number(),
  customerName: Joi.string(),
  customerTypeId: Joi.number(),
  depositId: Joi.number(),
  usageTypeId: Joi.number(),
  supplyChannelId: Joi.number(),
  groupId: Joi.number(),
  flagId: Joi.number(),
  extraInfo: Joi.object({
    financialCode: Joi.string(),
    salesCode: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    accountNumber: Joi.string(),
    shoppingCode: Joi.string(),
    stationCode: Joi.string()
  }),
  concessionaire: Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    nationalCode: Joi.string()
  }),
  bankAccountIds: Joi.array().items(Joi.number()),
  contractorBankAccountId: Joi.number()
})

class EditCustomerValidator extends AddCustomerValidator {

  constructor () {
    super()
    this.schema = schema
  }
}

module.exports = {
  EditCustomerValidator
}
