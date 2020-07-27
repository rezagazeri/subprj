const express = require('express')
const { BaseError, InternalError } = require('../../error/error')
const { Log, LogLevel } = require("../../log/log")
const { getLogger } = require("../../log/logger")

/**
 * 
 * @param {Error} err 
 * @param {express.request} req 
 * @param {express.response} res 
 * @param {function() => void} next 
 */
function errorMiddleware(err, req, res, next) {
    if (!err || !req || !res) {
        return
    }
    err = toBaseError(err)
    let log = (err instanceof BaseError) ?
        new Log(LogLevel.Warning, "ExpressErrorMiddleware", err) : err
    getLogger().handle(log)
    if (res.writable) {
        // sendError(req, res, err)
        sendError2(req, res, err)
    }
    if (next) {
        next()
    }
}

/**
 * 
 * @param {Error} err 
 * @returns {BaseError}
 */
function toBaseError(err) {
    return (err instanceof BaseError) ? err : new InternalError(err)
}

/**
 * 
 * @param {express.request} req
 * @param {express.response} res 
 * @param {BaseError} err 
 */
function sendError(req, res, err) {
    let status = (err.httpStatusCode) ? err.httpStatusCode : 501
    res.status(status).json({
        statusCode: status,
        key: (err.key) ? err.key : "UNKNOWN",
        message: (status < 500 && err.message) ? err.message : "",
        userMessage: getUserMessage(req, err),
        details: (err.details) ? err.details : {}
    })
}

/**
 * 
 * @param {express.request} req 
 * @param {express.response} res 
 * @param {BaseError} err 
 */
function sendError2(req, res, err) {
    let body = {
        result: false,
        data: {},
        error: {
            code: (err.httpStatusCode) ? err.httpStatusCode : 501,
            message: (err.message) ? err.message : "",
            messageFlag: false,
            error: {}
        }
    }
    let message
    if (err.message) {
        message = err.message
    } else if (err.message) {
        message = err.message
    } else {
        message = ""
    }
    body.error.message = message
    res.status(200).json(body)
}

/**
 * 
 * @param {express.request} req 
 * @param {BaseError} err 
 * @returns {string}
 */
function getUserMessage(req, err) {
    let lang = req.headers["x-lang"]
    if (lang) {
        lang = lang.toLowerCase()
    }
    let message
    switch(lang) {
        case "fa":
            message = err.userMessages["fa"]
            break
        default:
            message = err.userMessages["en"]
    }
    return (message != undefined) ? message : ""
}

module.exports = {
    errorMiddleware
}
