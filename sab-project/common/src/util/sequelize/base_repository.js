const { Model } = require("sequelize")

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

    /**
     * 
     * @param {number} id 
     * @returns {Promise<Object>}
     */
    async get(id) {
        return new Promise((resolve, reject) => {
            this.repo.findOne({
                where: { id: id },
            }).then(users => {
                if (users && users.lenght != 0) {
                    users = users[0]
                }
                resolve(users)
            }).catch(err => {
                reject(this.__toBaseError(err))
            })
        })
    }

    /**
     * 
     * @param {Options} options 
     * @returns {Promise<Object[]>}
     */
    async getList(options) {
        return new Promise((resolve, reject) => {
            this.repo.findAll(options).then(users => {
                resolve(users)
            }).catch(err => {
                reject(this.__toBaseError(err))
            })
        })
    }

    /**
     * 
     * @param {Object} obj 
     * @returns {Promise<Object>}
     */
    async add(obj) {
        return new Promise((resolve, reject) => {
            this.repo.create(obj).then(result => {
                resolve(result)
            }).catch(err => {
                reject(this.__toBaseError(err))
            })
        })
    }

    /**
     * 
     * @param {Object} data
     * @param {Object} conditions
     * @returns {Promise<void>}
     */
    async patch(data, conditions) {
        return new Promise((resolve, reject) => {
            this.repo.update(data, conditions).then(() => {
                resolve()
            }).catch(err => {
                reject(this.__toBaseError(err))
            })
        })
    }

    /**
     * 
     * @param {number} id 
     * @param {boolean} logical
     * @returns {Promise<void>}
     */
    async drop(id, logical) {
        return new Promise((resolve, reject) => {
            this.repo.destroy({
                where: { id }
            }).then(obj => {
                // TODO handle success
                resolve()
            }).catch(err => {
                reject(this.__toBaseError(err))
            })
        })
    }

    /**
     * 
     * @param {Error} err 
     */
    __toBaseError(err) {
        // TODO improve
        return err
    }
}

module.exports = {
    BaseRepository
}
