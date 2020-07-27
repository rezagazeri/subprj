const redis = require("redis")
const { getConfig } = require("../config/config")

/**
 * 
 * @param {number} index 
 * @returns {redis.RedisClient}
 */
async function createRedisClient(index = 0) {
    let client = getConfig().redis.clients[index]
    return redis.createClient(client.port, client.host)
}

/**
 * 
 * @type {Array}
 */
let clients = new Array()

/**
 * 
 * @param {number} index 
 * @returns {redis.RedisClient}
 */
function getRedisClient(index = 0) {
    return clients[index]
}

/**
 * 
 * @returns {Promise<void>}
 */
async function initRedisClients() {
    let drivers = getConfig().redis.clients
    for (let i = 0; i < drivers.length; i++) {
        let driver = drivers[i]
        clients.push(redis.createClient(driver.port, driver.host))
    }
}

module.exports = {
    createRedisClient,
    getRedisClient,
    initRedisClients
}
