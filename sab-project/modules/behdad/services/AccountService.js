const BaseService = require('../../../services/BaseService')

class AccountService extends BaseService {

  constructor (options = {}) {
    options.repo = require('../repository/AccountRepository')
    super(options)
  }

  async getLastUpdate () {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.repo.getLastUpdate())
      } catch (e) {
        reject(e)
      }
    })
  }

  async setLastUpdate (model,date) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.repo.setLastUpdate(model,date))
      } catch (e) {
        reject(e)
      }
    })
  }

}

module.exports = AccountService