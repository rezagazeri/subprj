const { Sequelize } = require("sequelize")
const { getConfig } = require("../config/config")

/**
 * 
 * @param {number} index 
 * @returns {Sequelize}
 */
async function createSequelizeClient(index = 0) {}

/**
 * 
 * @type {Array}
 */
let clients = new Array()

/**
 * 
 * @param {number} index 
 * @returns {Sequelize}
 */
function getSequelizeClient(index = 0) {
    return clients[index]
}

/**
 * 
 * @returns {Promise<void>}
 */
async function initSequelizeClients() {
    let drivers = getConfig().sequelize.clients
    drivers.forEach(e => {
        clients.push(new Sequelize(e.database, e.username, e.password, {
            host: e.host,
            port: e.port,
            dialect: e.dialect,
            pool: {
                max: e.pool.max,
                min: e.pool.min,
                acquire: e.pool.acquire,
                idle: e.pool.idle
            },
            define: {
                underscored: e.define.underscored,
                syncOnAssociation: e.define.syncOnAssociation,
                charset: e.define.charset,
                collate: e.define.collate,
                timestamps: e.define.timestamps
            }
        }))
    })
}

module.exports = {
    createSequelizeClient,
    getSequelizeClient,
    initSequelizeClients
}
