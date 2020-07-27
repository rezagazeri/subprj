const express = require('express')
const cluster = require('cluster')
const common = require('./common/index.js')
const {Context} = require('./context/context')
const {Configuration} = require('./context/configuration')
const http = require('http')
const https = require('https')
const path = require('path')
const fs = require('fs')

/**
 *
 */
async function run () {
  await initCommon()
  await initGlobal()
  if (cluster.isMaster)
    await runMaster()
  else if (cluster.isWorker)
    await runWorker()
}

/**
 *
 */
async function initCommon () {
  await common.initConfig('./config/default.json')
  await common.initSequelizeClients()
}

/**
 *
 */
async function initGlobal () {
  global.common = common
  global.constants = require('./config/constants')
  global.services = require('./services')
  global.repository = require('./repository')
  global.error = require('./utils/error')
  global.db = {
    mysql: require('./models/mysql'),
    //mongo: require('./models/mongo'),
    redis: require('./models/redis'),
  }
}

/**
 *
 */
async function runMaster () {
  let app = express()
  let ctx = new Context()
  await ctx.init()
  await new Configuration().config(app, ctx)

  if (common.getConfig().workers.active && common.getConfig().workers.workerNum > 0) {
    for (let i = 0; i < common.getConfig().workers.workerNum; i++)
      cluster.fork()
  }
  app.on('error', onError)
  const key = path.join(__dirname, 'config', 'ssl', 'server.key')
  const cert = path.join(__dirname, 'config', 'ssl', 'server.crt')
  const sslOptions = {
    key: fs.readFileSync(key, 'utf8'),
    cert: fs.readFileSync(cert, 'utf8'),
    requestCert: false,
    rejectUnauthorized: false,
    ciphers: [
      'ECDHE-RSA-AES256-SHA384',
      'DHE-RSA-AES256-SHA384',
      'ECDHE-RSA-AES256-SHA256',
      'DHE-RSA-AES256-SHA256',
      'ECDHE-RSA-AES128-SHA256',
      'DHE-RSA-AES128-SHA256',
      'HIGH',
      '!aNULL',
      '!eNULL',
      '!EXPORT',
      '!DES',
      '!RC4',
      '!MD5',
      '!PSK',
      '!SRP',
      '!CAMELLIA',
    ].join(':'),
    honorCipherOrder: true,
  }
  const server = https.createServer(sslOptions, app).listen(process.env.PORT || common.getConfig().port)
  // app.listen(process.env.PORT || common.getConfig().port)
  console.log('Listening on ' + (process.env.PORT || common.getConfig().port))
}

/**
 *
 */
async function runWorker () {
  require('./job/job_' + cluster.worker.id).JobRunning()
  console.log(`Worker ${process.pid} for schedule system `)
}

async function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  let bind = typeof common.getConfig().port === 'string'
    ? 'Pipe ' + common.getConfig().port
    : 'Port ' + common.getConfig().port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

async function onListening () {
  console.log('Listening on ' + (process.env.PORT || common.getConfig().port))
}

run()
