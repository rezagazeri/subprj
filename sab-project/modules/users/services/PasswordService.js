const BaseService = require('../../../services/BaseService')
const crypto = require('crypto')

class PasswordService extends BaseService {
  constructor (options = {}) {
    options.repo = require('../repository/UserRepository')
    super(options)
    if (options.identifier) {
      this.identifier = options.identifier
    }
    if (options.userId) {
      this.userId = options.userId
    }
    if (options.changePassword) {
      this.changePassword = options.changePassword
    }
  }

  async forget () {
    return new Promise(async (resolve, reject) => {
      try {
        this.user = await this.repo.getUserByIdentifier({identifier: this.identifier})
        if (this.user) {
          let newPassword = PasswordService.generateNewPassword()
          await this.repo.update(this.user, {password: newPassword.hash})
          // TODO sendSMS and Email
          console.log('newPassword', newPassword.pure)
          resolve()
        } else {
          reject(new error.BadRequestError('identifier not found'))
        }
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async change () {
    return new Promise(async (resolve, reject) => {
      try {
        this.user = await this.repo.getById({id: this.userId})
        let hpassword = PasswordService.encryptPassword(this.changePassword.old)
        if (this.user.password === hpassword) {
          await this.repo.update(this.user, {password: PasswordService.encryptPassword(this.changePassword.new)})
          resolve()
        } else {
          reject(new error.BadRequestError('old password wrong!'))
        }
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async reset () {
    return new Promise(async (resolve, reject) => {
      try {
        this.user = await this.repo.getById({id: this.userId})
        if (this.user) {
          let newPassword = PasswordService.generateNewPassword()
          await this.repo.update(this.user, {password: newPassword.hash})
          // TODO sendSMS and Email
          console.log('newPassword', newPassword.pure)
          resolve()
        } else {
          reject(new error.BadRequestError('identifier not found'))
        }
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  static generateNewPassword () {
    console.log('1')
    let newPassword = Math.random().toString(36).substring(2, 10)
    let hash = PasswordService.encryptPassword(newPassword)
    return {
      pure: newPassword,
      hash: hash,
    }
  }

  static encryptPassword (password) {
    const stringToHash = constants.user.auth.preSalt + password + constants.user.auth.postSalt
    return crypto.createHash('md5').update(stringToHash).digest('hex')
  }
}

module.exports = PasswordService