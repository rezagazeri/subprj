const redisList = require('../../../models/redis/List')

class RedisListService {
  constructor (options = {}) {
    this.redisList = new redisList({name: options.name})
  }

  async queue (data) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.redisList.push(data))
      } catch (e) {
        reject(e)
      }
    })
  }

  async getFromQueue () {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.redisList.pop(true))
      } catch (e) {
        reject(e)
      }
    })
  }

  async getAll () {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.redisList.empty())
      } catch (e) {
        reject(e)
      }
    })
  }
}

module.exports = RedisListService