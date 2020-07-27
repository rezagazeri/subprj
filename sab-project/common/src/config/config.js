const { loadJsonFile } = require("../util/json")

/**
 * 
 * @type {Object}
 */
let config

/**
 * 
 * @returns {Object}
 */
function getConfig() {
    return config
}

/**
 * 
 * @param {string} path
 * @param {boolean} fromRoot 
 * @returns {void}
 */
async function initConfig(path = "config.json", fromRoot) {
    env = process.env.NODE_ENV || 'development'
    if (!fromRoot) {
        path = require("path").dirname(require.main.filename) + "/" + (path)
    }
    config = await loadJsonFile(path)
    config = config[env]
}

module.exports = {
    getConfig,
    initConfig
}
