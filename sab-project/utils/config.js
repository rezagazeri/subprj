/**
 * @typedef {Object[]} SequelizeConfig 
 * @property {string} database 
 * @property {string} username 
 * @property {string} password 
 * @property {string} host 
 * @property {number} port 
 */

/**
 * @typedef {Object} LogConfig 
 * @property {string} level 
 * @property {string} directory 
 * @property {string} maxLogPerFile 
 * @property {string[]} specials 
 */

/**
 * @typedef {Object} RouterConfig 
 * @property {number} port 
 * @property {string} host 
 */

/**
 * 
 */
class Config {

    async init() {
        this.config = await require("../config/default.json")
        this.config = this.config[process.env.NODE_ENV || 'development']
    }

    /**
     * 
     * @returns {SequelizeConfig}
     */
    getSequelizeConfig() {
        return this.config.sequelize
    }

    /**
     * 
     * @returns {LogConfig}
     */
    getLogConfig() {
        return this.config.logs
    }

    /**
     * 
     * @returns {RouterConfig}
     */
    getRouterConfig() {
        return this.config.router
    }
}

module.exports = {
    Config
}
