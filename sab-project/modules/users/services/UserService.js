const BaseService = require('../../../services/BaseService')
const PasswordService = require('../services/PasswordService')

class UserService extends BaseService {
  constructor (options = {}) {
    options.repo = require('../repository/UserRepository')
    super(options)
  }

  async get () {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await this.repo.getById({id: this.filter.id})
        delete user.password
        resolve(user)
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async create () {
    return new Promise(async (resolve, reject) => {
      try {
        this.params.hpassword = PasswordService.encryptPassword(this.params.password)
        resolve(await this.repo.register(this.params))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }
}

module.exports = UserService