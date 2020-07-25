const { BaseError, BadRequestError } = require("../models/error")

/**
 * @typedef {Object} JoiError
 * @property {string} message
 * @property {Object[]} details
 * @property {string} details.type
 * @property {string} details.message
 * @property {Object} details.context
 * @property {string} details.context.key
 * @property {string} details.context.label
 * @property {number} details.context.limit
 */

/**
 * 
 */
class Validator {

    /**
     * 
     * @param {Object} schema 
     */
    constructor(schema) {
        this.schema = schema
    }

    /**
     * 
     * @param {Object} obj 
     * @returns {Promise<void>}
     * @throws {BaseError}
     */
    async validate(obj) {
        try {
            await this.schema.validateAsync(obj)
        } catch (err) {
            throw this.__convert(err, obj)
        }
    }

    /**
     * 
     * @param {JoiError} err 
     * @param {Object} obj 
     * @returns {BaseError}
     */
    __convert(err, obj) {
        let badRequest = new BadRequestError(err.message)
        if (err.details && err.details.length > 0) {
            const elem = err.details[0]
            const errType = elem.type
            const field = this._getAliasName(elem.context.label, err)
            badRequest.userMessages["fa"] = this._getMessage(errType, field, err, obj)
        }
        return badRequest
    }

    /**
     * 
     * @param {string} field 
     * @param {JoiError} err 
     * @returns {string}
     */
    _getAliasName(field, err) {
        return field
    }

    /**
     * 
     * @param {string} errType 
     * @param {string} field 
     * @param {JoiError} err 
     * @param {Object} obj 
     */
    _getMessage(errType, field, err, obj) {
        let elem = err.details[0]
        let message
        switch (errType) {
            case "object.unknown":
                message = `فیلد اضافی: ${field}`
                break

            case "any.required":
                message = `فیلد الزامی: ${field}`
                break

            case "string.base":
                message = `مقدار ${field} باید متن باشد`
                break

            case "number.base":
                message = `مقدار ${field} باید عدد باشد`
                break

            case "boolean.base":
                message = `مقدار ${field} باید بولین باشد`
                break

            case "array.base":
                message = `مقدار ${field} باید آرایه باشد`
                break

            case "object.base":
                message = `مقدار ${field} باید آبجکت باشد`
                break

            case "array.min":
                message = `حداقل باید ${elem.context.limit} مورد برای ${field} وارد شود`
                break

            case "array.max":
                message = `حداکثر باید ${elem.context.limit} مورد برای ${field} وارد شود`
                break

            case "number.min":
                message = `مقدار ${field} نباید کمتر از ${elem.context.limit} باشد`    
                break

            case "number.max":
                message = `مقدار ${field} نباید بیشتر از ${elem.context.limit} باشد`
                break

            case "string.min":
                message = `حداقل تعداد کاراکتر مجاز برای ${field} ${elem.context.limit} است`
                break

            case "string.max":
                message = `حداکثر تعداد کاراکتر مجاز برای ${field} ${elem.context.limit} است`
                break

            case "string.email":
                message = `متن ورودی ${field} باید ایمیل باشد`
                break

            default:
                message = "ورودی ها "
                break
        }
        return message
    }
}

module.exports = {
    Validator
}
