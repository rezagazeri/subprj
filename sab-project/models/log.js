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
     * @param {string} name 
     * @param {Object} data 
     */
    constructor(name, data) {
        this.name = name
        this.data = data
        this.dateTime = new Date()
    }
}

module.exports = {
    LogLevel,
    Log
}
