const mongoose = require("mongoose")
const { getConfig } = require("../config/config")

/**
 * 
 * @param {number} index 
 * @returns {mongoose.Mongoose}
 */
async function createMongooseClient(index = 0) {
    let client = getConfig().mongoos.clients[index]
    let auth = (client.username && client.password) ? `${client.username}:${client.password}@` : ""
    return mongoose.connect(
        `mongodb://${auth}${client.host}:${client.port}/${client.dbName}`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
}

/**
 * 
 * @type {Array}
 */
let clients = new Array()

/**
 * 
 * @param {number} index
 * @returns {mongoose.Mongoose}
 */
function getMongoosClient(index = 0) {
    return clients[index]
}

/**
 * 
 * @returns {Promise<void>}
 */
async function initMongoosClients() {
    let drivers = getConfig().mongoos.clients
    drivers.forEach(element => {
        let auth = (element.username && element.password) ? `${element.username}:${element.password}@` : ""
        clients.push(mongoose.connect(
            `mongodb://${auth}${element.host}:${element.port}/${element.dbName}`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        ))
    })
}

module.exports = {
    createMongooseClient,
    getMongoosClient,
    initMongoosClients
}
