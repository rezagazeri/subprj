const mongo = require('mongodb')
const { getConfig } = require("../config/config")

/**
 * 
 * @param {number} index 
 * @returns {mongo.MongoClient}
 */
async function createMongoClient(index = 0) {
    let client = getConfig().mongo.clients[index]
    // TODO
}

/**
 * 
 * @type {Array}
 */
let clients = new Array()

/**
 * 
 * @param {number} index
 * @returns {}
 */
function getMongoClient(index = 0) {
    return clients[index]
}

/**
 * 
 * @returns {Promise<void>}
 */
async function initMongoClients() {
    let drivers = getConfig().mongo.clients
    drivers.forEach(element => {
        // todo
    })
}

module.exports = {
    createMongoClient,
    getMongoClient,
    initMongoClients
}
