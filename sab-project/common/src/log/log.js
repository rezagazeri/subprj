/**
 * 
 * @enum {number}
 */
const LogLevel = {
    Fatal: 0,
    Error: 1,
    Warning: 2,
    Info: 3,
    Verbose: 4,
    Debug: 5
}

/**
 * 
 */
class Log {

    /**
     * 
     * @param {LogLevel} level 
     * @param {string} key 
     * @param {Object} data 
     */
    constructor(level, key, data) {
        this.level = level
        this.key = key
        this.data = data
        this.dateTime = new Date()
    }
}

module.exports = {
    LogLevel,
    Log
}
