/*
let mongoose = require('mongoose')
let fs = require('fs')
let mongdb = mongoose.connection
let env = process.env.NODE_ENV || 'development'
let config = require('./../../config/default')[env]

mongoose.connect('mongodb://'+config.mongoDB.host+':'+config.mongoDB.port+'/'+config.mongoDB.database, {
  poolSize: config.mongoDB.connectionLimit,
  user: config.mongoDB.user,
  pass: config.mongoDB.password,
  useCreateIndex: true,
  autoReconnect: true,
  useNewUrlParser: true,
  reconnectTries: 10,
  reconnectInterval:100,
  promiseLibrary: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000
})
mongoose.set('debug', true)
/!* Check Connection*!/
mongdb.on('error', function (error) {
  console.log('error happened:', error)
})
mongdb.on('open', function () {
  console.log('MongoDb Connection Initiated .')
})
mongdb.on('disconnected', function () {
  console.log('we are disconnected!!!')
})
mongdb.on('reconnectFailed', function () {
  console.log('reconnectFailed!!!')
})

fs.readdirSync(__dirname).forEach(function (file) {
  if (file !== 'index.js') {
    let moduleName = file.split('.')[0]
    let model = require('./' + moduleName)(mongoose)
    module.exports[model.modelName] = model
  }
})*/
