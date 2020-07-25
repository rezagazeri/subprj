const express = require('express')
const {LogLevel, Log} = require('../models/log')
const {Context} = require('../context/context')

/**
 * @typedef {function(Context,express.request,express.response)} Handler
 */

/**
 * @typedef {function(express.request,express.response)} ExpressHandler
 */

/**
 * @typedef {function(Error,express.request,express.response,function())} ExpressErrorHandler
 */

/**
 *
 * @param {Context} ctx
 * @param {Handler} cb
 * @returns {ExpressHandler}
 */
function getAction (ctx, cb) {
  return async (req, res) => {
    try {
      await cb(ctx, req, res, req.user)
    } catch (err) {
      console.log('**********')
      console.log(err)
      ctx.getErrorHandler().handle(err, req, res)
    }
  }
}

/**
 *
 * @param {Context} ctx
 * @param {LogLevel} level
 * @returns {ExpressErrorHandler}
 */
function getLogMiddleware (ctx, level = LogLevel.Info, title = 'ExpressSuccess') {
  return (req, res, next) => {
    let startTime = new Date()
    let oldJson = res.json
    res.json = (resBody) => {
      res.on('finish', () => {
        let responseTime = new Date().getTime() - startTime.getTime()
        ctx.getLogger().handle(level, new Log(title,
          {
            responseTime,
            url: req.url,
            request:{
              params: req.params,
              query: req.query,
              headers: req.headers,
              body:req.body
            },
            response:{
              headers: res.getHeaders(),
              body:resBody
            },
          }))
      })
      res.json = oldJson
      res.json(resBody)
    }
    if (next) next()
  }
}

/**
 *
 * @param {Context} ctx
 * @returns {ExpressErrorHandler}
 */
function getErrorMiddleware (ctx) {
  return async (err, req, res, next) => {
    await ctx.getErrorHandler().handle(err, req, res)
    if (next) next()
  }
}

module.exports = {
  getAction,
  getLogMiddleware,
  getErrorMiddleware,
}
