'use strict'

const common = require("./../../common/index")
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)

let db = {}
let relations = require('./relations')

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== 'relations.js') && (file !== basename) && (file.slice(-3) === '.js')
}).forEach(file => {
  const model = common.getSequelizeClient(0)['import'](path.join(__dirname, file))
  db[model.name] = model
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})
db = relations(db)
db.sequelize = common.getSequelizeClient(0)
db.Sequelize = Sequelize

module.exports = db
