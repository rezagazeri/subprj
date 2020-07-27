const fs = require("fs")
const moment = require("moment")
const { LogLevel, Log } = require("./log")
const { BaseError } = require("../error/error")
const { getConfig } = require("../config/config")

/**
 * 
 */
class Logger {

    /**
     * 
     * @param {LogLevel} level 
     * @param {string} dir
     * @param {number} max
     * @param {Array<string>} specials
     */
    constructor(
        level,
        dir,
        max = 100000,
        specials
    ) {
        this.level = level
        this.dir = dir
        this.max = max
        this.current = 0
        this.repetitions = 0
        this.padding = (max - 1).toString().length
        if (specials) this.__initSpecials(specials)
    }

    /**
     * 
     * @param {Array<string>} specials 
     */
    __initSpecials(specials) {
        let specialsDir = `${this.dir}/trace`
        if (!fs.existsSync(specialsDir)){
            fs.mkdirSync(specialsDir);
        }
        this.specials = new Object()
        this.__initStarSpecials(specials)
        this.__initOtherSpecials(specials)
    }

    /**
     * 
     * @returns {void}
     */
    __initStarSpecials(specials) {
        specials.forEach(e => {
            let vals = e.split(":")
            if (vals.length == 2) {
                vals[0] = vals[0].trim()
                vals[1] = vals[1].trim()
                let values = vals[1].split("|")
                values.forEach(e => {
                    e = e.trim()
                    if (e == "*") {
                        let item = new Array()
                        item.push("*")
                        this.specials[LogLevel[vals[0]]] = item
                    }
                })
            }
        })
    }

    /**
     * 
     * @returns {void}
     */
    __initOtherSpecials(specials) {
        specials.forEach(e => {
            let vals = e.split(":")
            if (vals.length == 2 && vals[1] != "*") {
                vals[0] = vals[0].trim()
                vals[1] = vals[1].trim()
                let item = this.specials[LogLevel[vals[0]]]
                if (!item) {
                    item = new Array()
                    this.specials[LogLevel[vals[0]]] = item
                }
                if (item.length == 0 || item[0] != "*") {
                    let values = vals[1].split("|")
                    values.forEach(e => {
                        e = e.trim()
                        item.push(e)
                    })
                }
            }
        })
    }

    /**
     * 
     * @param {Log|Error} log 
     * @returns {void}
     */
    async handle(log) {
        if (log instanceof Error) {
            log = this.__toLog(log)
        }
        if (!this.__isValid(log)) {
            return
        }
        this.__write(log)
        if (log.level == LogLevel.Fatal) {
            this.__fatal(log)
        }
    }

    /**
     * 
     * @param {Log} log 
     */
    __isValid(log) {
        let valid = true
        if (!log || log.level > this.level || !log.data) {
            valid = false
        }
        return valid
    }

    /**
     * 
     * @param {Error} err 
     * @returns {Log}
     */
    __toLog(err) {
        let key = (err instanceof BaseError) ? `${err.key}:${err.message}` : "ERROR"
        let log = new Log(LogLevel.Error, key, {
            name: err.name,
            message: err.message,
            stack: err.stack
        })
        return log
    }

    /**
     * 
     * @param {Log} log 
     * @returns {void}
     */
    __write(log) {
        let data = `${log.dateTime.toISOString()} ${Object.keys(LogLevel)[log.level]} ${log.key}\r\n${JSON.stringify(log.data)}\r\n\r\n`
        this.__writeNormal(data)
        if (this.specials && this.__isSpecial(log)) {
            this.__writeSpecials(data)
        }
    }

    /**
     * 
     * @param {Log} log 
     * @returns {boolean}
     */
    __isSpecial(log) {
        let arr = this.specials[log.level]
        if (!arr) {
            return false
        }
        if (arr[0] == "*") {
            return true
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == log.key) {
                return true
            }
        }
        return false
    }

    /**
     * 
     * @param {string} data 
     */
    async __writeNormal(data) {
        if (!this.writeStream || this.current == this.max) {
            this.current = 0
            await this.__initialFile()
        }
        this.writeStream.write(`[${(this.current).toString().padStart(this.padding, "0")}] ${data}`)
        this.current++
    }

    /**
     * 
     * @param {string} data 
     */
    async __writeSpecials(data) {
        if (!this.specialsWriteStream || this.specialsCurrent == this.max) {
            this.specialsCurrent = 0
            await this.__initialSpecialsFile()
        }
        this.specialsWriteStream.write(`[${(this.specialsCurrent).toString().padStart(this.padding, "0")}] ${data}`)
        this.specialsCurrent++
    }

    /**
     * 
     * @param {string} name
     */
    __initialFile() {
        let name = this.__generateName()
        if (this.writeStream) {
            this.writeStream.end()
        }
        this.writeStream = fs.createWriteStream(`${this.dir}/${name}.log`, { flags: "w" })
    }

    /**
     * 
     * @returns {void}
     */
    __initialSpecialsFile() {
        let name = this.__generateSpecialName()
        if (this.specialsWriteStream) {
            this.specialsWriteStream.end()
        }
        this.specialsWriteStream = fs.createWriteStream(`${this.dir}/trace/${name}.log`, { flags: "w" })
    }

    /**
     * 
     * @returns {string}
     */
    __generateName() {
        let name = moment.utc().format("YYMMDD_HHmmss")
        if (this.baseFileName == name) {
            this.repetitions++
            name = `${name}(${this.repetitions})`
        } else {
            this.baseFileName = name
            this.repetitions = 0
        }
        return `${name}${(!this.writeStream) ? "(0)" : ""}` 
    }

    /**
     * 
     * @returns {string}
     */
    __generateSpecialName() {
        let name = moment.utc().format("YYMMDD_HHmmss")
        if (this.baseSpecialFileName == name) {
            this.specialRepetitions++
            name = `${name}(${this.specialRepetitions})`
        } else {
            this.baseSpecialFileName = name
            this.specialRepetitions = 0
        }
        return `${name}${(!this.specialsWriteStream) ? "(0)" : ""}` 
    }

    /**
     * 
     * @param {Log} log 
     * @returns {void}
     */
    __fatal(log) {
        process.exit(1)
    }
}

/**
 * 
 * @type {Logger}
 */
let instance

/**
 * 
 * @returns {Logger}
 */
function getLogger() {
    return instance
}

/**
 * 
 * @returns {void}
 */
async function initLogger() {
    let options = getConfig().logs
    let level = LogLevel[options.level]
    let dir = options.directory
    let max = options.maxLogPerFile
    let specials = options.specials
    instance = new Logger(level, dir, max, specials)
}

module.exports = {
    Logger,
    initLogger,
    getLogger
}
