const Joi = require('@hapi/joi')
const { Validator } = require("../../../utils/validator")

const schema = Joi.object({
    oilChartStructureId: Joi.number().required(),
    customerName: Joi.string().required(),
    customerTypeId: Joi.number().required(),
    depositId: Joi.number().required(),
    usageTypeId: Joi.number().required(),
    supplyChannelId: Joi.number().required(),
    groupId: Joi.number().required(),
    flagId: Joi.number().required(),
    extraInfo: Joi.object({
        financialCode: Joi.string(),
        salesCode: Joi.string(),
        phone: Joi.string(),
        address: Joi.string(),
        accountNumber: Joi.string(),
        shoppingCode: Joi.string(),
        stationCode: Joi.string()
    }).required(),
    concessionaire: Joi.object({
        name: Joi.string(),
        phone: Joi.string(),
        nationalCode: Joi.string()
    }),
    bankAccountIds: Joi.array().items(Joi.number()),
    contractorBankAccountId: Joi.number()
})

class AddCustomerValidator extends Validator {

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
            case "oilChartStructureId":
                message = "شناسه ستاد، منطقه یا ناحیه"
                break

            case "customerName":
                message = "نام مشتری"
                break

            case "customerTypeId":
                message = "نوع مشتری"
                break

            case "depositId":
                message = "شناسه واریز"
                break

            case "usageTypeId":
                message = "نوع کاربری"
                break

            case "supplyChannelId":
                message = "مجاری عرضه"
                break

            case "groupId":
                message = "گروه"
                break

            case "flagId":
                message = "وضعیت"
                break

            case "extraInfo":
                message = "اطلاعات اضافی"
                break

            case "extraInfo.financialCode":
                message = "کد مالی"
                break

            case "extraInfo.salesCode":
                message = "کد فروش"
                break

            case "extraInfo.phone":
                message = "تلفن"
                break

            case "extraInfo.address":
                message = "آدرس"
                break

            case "extraInfo.accountNumber":
                message = "شماره حساب"
                break

            case "extraInfo.shoppingCode":
                message = "کد فروشگاه"
                break

            case "extraInfo.stationCode":
                message = "کد دستگاه"
                break

            case "concessionaire":
                message = "صاحب امتیاز"
                break

            case "concessionaire.name":
                message = "نام صاحب امتیاز"
                break

            case "concessionaire.phone":
                message = "شماره تلفن امتیاز"
                break

            case "concessionaire.nationalCode":
                message = "کد ملی"
                break

            case "contractorBankAccountId":
                message = "شماره حساب پیمانکار"
                break

            default:
                message = super._getAliasName(field, err)
                break
        }
        if (field.startsWith("bankAccountIds")) {
            message = "حساب های بانکی"
        }
        return message
    }
}

module.exports = {
    AddCustomerValidator
}
