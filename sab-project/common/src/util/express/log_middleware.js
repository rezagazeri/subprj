const express = require('express')
const { Log, LogLevel } = require("../../log/log")
const { getLogger } = require("../../log/logger")

/**
 * 
 * @param {express.request} req 
 * @param {express.response} res 
 * @param {function()} next 
 */
function logMiddleware(req, res, next) {
    let startTime = new Date()
    let oldJson = res.json
    res.json = (resBody) => {
        res.on("finish", () => {
            let responseTime = new Date().getTime() - startTime.getTime()
            handle(req, res, resBody, responseTime)
        })
        res.json = oldJson
        res.json(resBody)
    }
    if (next) {
        next()
    }
}

/**
 * 
 * @param {express.request} req 
 * @param {express.response} res 
 * @param {Object} resBody 
 * @param {number} responseTime 
 */
function handle(req, res, resBody, responseTime) {
    getLogger().handle(new Log(LogLevel.Debug, "Express",
        { responseTime, requestBody: req.body, responseBody: resBody }))
}

module.exports = {
    logMiddleware
}
