const { Model } = require("sequelize")
const { Pagination } = require("./pagination")
const { ConflictError } = require("../models/error")
const { SequelizeErrorConverter } = require("./sequelize_error_converter")

/**
 * 
 */
class BaseRepository {

    /**
     * 
     * @param {Model} model 
     */
    constructor(model) {
        this.repo = model
    }

    async select(options) {
        return new Promise((resolve, reject) => {
            this.repo.findOne(options).then(obj => {
                resolve(obj)
            }).catch(err => {
                reject(new SequelizeErrorConverter().convert(err))
            })
        })
    }

    /**
     * 
     * @param {number} id 
     * @param {string[]} excludes
     * @returns {Promise<Object>}
     */
    async selectById(id, excludes, options) {
        return new Promise((resolve, reject) => {
            if (options == undefined) {
                options = {}
            }
            if (options.where == undefined) {
                options.where = {}
            }
            options.where.id = id
            if (excludes && excludes.length != 0) {
                options.attributes = {
                    exclude: excludes
                }
            }
            this.repo.findOne(options).then(obj => {
                resolve((obj != undefined && obj != null) ? obj : {})
            }).catch(err => {
                reject(new SequelizeErrorConverter().convert(err))
            })
        })
    }

    /**
     * 
     * @param {Options} options 
     * @param {Pagination} pagination 
     * @returns {Promise<Object[]>}
     */
    async selectList(options = {}, pagination) {
        return new Promise((resolve, reject) => {
            if (pagination) {
                this.repo.findAndCountAll(options).then(data => {
                    pagination.count = data.count
                    resolve((data.rows != undefined && data.rows != null) ? data.rows : [])
                }).catch(err => {
                    reject(new SequelizeErrorConverter().convert(err))
                })
            } else {
                this.repo.findAll(options).then(data => {
                    resolve((data != undefined && data != null) ? data : [])
                }).catch(err => {
                    reject(new SequelizeErrorConverter().convert(err))
                })
            }
        })
    }

    /**
     * 
     * @param {Object} obj 
     * @returns {Promise<Object>}
     */
    async insert(obj, options) {
        obj.createdAt = new Date()
        obj.updatedAt = obj.createdAt
        if (obj && obj.id != undefined) {
            obj.id = undefined
        }
        return new Promise((resolve, reject) => {
            this.repo.create(obj, options).then(obj => {
                resolve(obj)
            }).catch(err => {
                reject(new SequelizeErrorConverter().convert(err))
            })
        })
    }

    /**
     * 
     * @param {Object} data
     * @param {Object} conditions
     * @returns {Promise<void>}
     */
    async update(data, options) {
        let count = await this.repo.count(options)
        if (!count) {
            throw new ConflictError("No such item found")
        }
        if (data && data.id != undefined) {
            data.id = undefined
        }
        return new Promise((resolve, reject) => {
            this.repo.update(data, options).then((updatedRows) => {
                resolve(updatedRows)
            }).catch(err => {
                reject(new SequelizeErrorConverter().convert(err))
            })
        })
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<void>}
     */
    async delete(id) {
        let count = await this.repo.count({ id })
        if (!count) {
            throw new ConflictError("No such item found")
        }
        return new Promise((resolve, reject) => {
            this.repo.destroy({
                where: { id }
            }).then(obj => {
                // TODO handle success
                resolve()
            }).catch(err => {
                reject(new SequelizeErrorConverter().convert(err))
            })
        })
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<void>}
     */
    async logicalDelete(id) {
        let refItem = await this.selectById(id)
        if (refItem == undefined || refItem.flagId == undefined || refItem.flagId == 3) {
            throw new ConflictError("No such item found")
        }
        return new Promise((resolve, reject) => {
            this.repo.update({
                flagId: 3
            }, {
                where: { id }
            }).then(result => {
                resolve(result)
            }).catch(err => {
                reject(new SequelizeErrorConverter().convert(err))
            })
        })
    }
}

module.exports = {
    BaseRepository
}
