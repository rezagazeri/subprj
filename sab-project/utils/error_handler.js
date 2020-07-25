const express = require("express")
const { Context } = require("../context/context")
const { BaseError, InternalError } = require("../models/error")
const { LogLevel, Log } = require("../models/log")

/**
 * 
 */
class ErrorHandler {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        this.ctx = ctx
    }

    /**
     * 
     * @param {BaseError} err 
     * @param {express.request} req 
     * @param {express.response} res 
     * @returns {Promise<void>}
     */
    handle(err, req, res) {
        err = this.__toBaseError(err)
        let status = (err.code) ? err.code : 501
        res.status(status).json({
            statusCode: status,
            key: (err.key) ? err.key : "UNKNOWN",
            message: (status < 500 && err.message) ? err.message : "",
            userMessage: this.__getUserMessage(req, err),
            details: (err.details) ? err.details : {}
        })
        this.ctx.getLogger().handle(LogLevel.Error, new Log("ExpressError", err))
    }

    /**
     * 
     * @param {Error} err 
     * @returns {BaseError}
     */
    __toBaseError(err) {
        if (!(err instanceof BaseError)) {
            err = new InternalError("INTERNAL", err.message)
        }
        return err
    }

    /**
     * 
     * @param {express.request} req 
     * @param {BaseError} err 
     * @returns {string}
     */
    __getUserMessage(req, err) {
        return err.userMessages[req.headers["x-lang"]]
    }
}

module.exports = {
    ErrorHandler
}
