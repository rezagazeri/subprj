const PasswordService = require('../services/PasswordService')
const UserRepository = require('../repository/UserRepository')
const UserAuthTokensRepository = require('../repository/UserAuthTokensRepository')
const BehdadAccountService = require('../../behdad/services/AccountService')
const crypto = require('crypto');

const CaptchaService = require('../services/CaptchaService');
const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');
const captcha = new CaptchaService();

// const {LogLevel, Log} = require('../../../models/log')

class LoginService {
  constructor (options = {}) {
    this.captcha_verified =false;
    this.repos = {
      user: new UserRepository(),
      userAuthTokens: new UserAuthTokensRepository(),
    }
    if (options.username) {
      this.username = options.username
    }
    if (options.password) {
      this.password = options.password
      this.hpassword = PasswordService.encryptPassword(options.password)
    }
    console.log("dddddddddd")
    //console.log(captcha.verify(client, options.captcha_id, options.captcha_value))
    if(options.captcha_value !=='' && options.captcha_id !=='' ){
      this.captcha_value =   options.captcha_value;
      this.captcha_id =   options.captcha_id;
    }

    if (options.authToken) {
      this.authToken = options.authToken
    }
    if (options.user) {
      this.user = options.user
    }
  }

  async login () {
    return new Promise(async (resolve, reject) => {
      try {
        if(this.captcha_value !=='' && this.captcha_id !=='' ){
          this.captcha_verified =  await captcha.verify(client, this.captcha_id, this.captcha_value)
        }

        //console.log("this.captcha_verified")
        //console.log(this.captcha_verified)
        if(process.env.NODE_ENV ==="production" && this.captcha_verified===false)
          reject(new error.InvalidCredentialsError('Wrong Captcha'))
        this.user = await this.repos.user.getLoginInfo({username: this.username})
        await this.__validateLogin()
        await this.__generateNewToken()
        await this.__disableAllTokens()
        await this.__insertNewToken()
        await this.__touchUser()
        resolve(LoginService.generateResponse(this.user, this.newToken))
      } catch (e) {
        // TODO Logging
        // ctx.getLogger().handle(LogLevel.Debug, new Log(constants.logKeys.dbError, {}))
        //console.trace(e)
        reject(new error.ToBaseError(e))
      }
    })
  }

  async logout () {
    return new Promise(async (resolve, reject) => {
      try {
        await this.__disableAllTokens()
        resolve({})
      } catch (e) {
        reject(e)
      }
    })
  }

  async update () {
    return new Promise(async (resolve, reject) => {
      try {
        const behdadAccount = new BehdadAccountService()
        let returnParams = {
          behdadLastUpdate: Date.parse(await behdadAccount.getLastUpdate()),
        }
        resolve(returnParams)
      } catch (e) {
        reject(e)
      }
    })
  }

  async __validateLogin () {
    return new Promise(async (resolve, reject) => {
      console.log(this.hpassword)
      if (this.user) {
        if (this.user.password === this.hpassword) {
          let cap;
          if(this.user.situationId!==constants.user.situation.accepted)
            cap = await captcha.create(client);

          switch (this.user.situationId) {
            case constants.user.situation.pending: {
              // TODO Logging
              console.log('pending user')
              reject(new error.InvalidCredentialsError('pending user'))
              break
            }
            case constants.user.situation.accepted: {
              resolve(this.user)
              break
            }
            case constants.user.situation.rejected: {
              // TODO Logging
              console.log('rejected user')

              reject(new error.InvalidCredentialsError('rejected user',cap.image,cap.id))
              break
            }
            case constants.user.situation.blocked: {
              // TODO Logging
              console.log('blocked user')
              reject(new error.InvalidCredentialsError('blocked user',cap.image,cap.id))
              break
            }
            case constants.user.situation.blackListed: {
              // TODO Logging
              console.log('black listed user')
              reject(new error.InvalidCredentialsError('black listed user',cap.image,cap.id))
              break
            }
            default: {
              // TODO Logging
              console.log('no situation')
              reject(new error.InvalidCredentialsError('no situation!'))
              break
            }
          }
        } else {
          const captcha = new CaptchaService();
          const cap = await captcha.create(client);

          // TODO Logging
          console.log('Password Not Match!')
          reject(new error.InvalidCredentialsError('Password Not Match!',cap.image,cap.id))
        }
      } else {
        const captcha = new CaptchaService();
        const cap = await captcha.create(client);

        // TODO Logging
        console.log('Username Not Found!')
        reject(new error.InvalidCredentialsError('Username Not Found!',cap.image,cap.id))
      }
    })
  }

  async __generateNewToken () {
    let stringToHash = constants.user.auth.token.s1
      + this.user.username + constants.user.auth.token.s2
      + this.user.password + constants.user.auth.token.s3
      + this.user.email + constants.user.auth.token.s4
      + this.user.mobile + constants.user.auth.token.s5
      + Date.now()
    this.newToken = crypto.createHash('md5').update(stringToHash).digest('hex')
    return this.newToken
  }

  async __disableAllTokens () {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.repos.userAuthTokens.disableAllTokenByUserId({userId: this.user.id}))
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async __insertNewToken () {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.repos.userAuthTokens.insertNewToken({
          userId: this.user.id,
          authToken: this.newToken,
        }))
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async __touchUser () {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.repos.user.successfulLogin({model: this.user}))
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  static generateResponse (user, newToken = false) {
    let roles = LoginService.roles(user)
    let role = LoginService.higherRole(roles)
    return {
      id: user.id,
      fullName: user.fullName,
      genderId: user.genderId,
      email: user.email,
      mobile: user.mobile,
      lastLoginDate: user.lastLoginDate,
      loginCount: user.loginCount,
      authToken: newToken ? newToken : user.authToken,
      situationId: user.situationId,
      roleName: role.name,
      roleLevel: role.levelId,
      chartStructure: role.chartStructure,
      roles: roles,
    }
  }

  static roles (user) {
    let roles = []
    user.roles.map(role => {
      roles.push({
        id: role.roleId,
        name: role.role.name,
        levelId: role.role.userLevelId,
        levelName: role.role.level.name,
        chartStructure: role.chartStructure,
      })
    })
    return roles
  }

  static higherRole (roles) {
    let level = Number.MAX_SAFE_INTEGER
    let selectedRole = {}
    roles.map(role => {
      if (role.levelId < level) {
        level = role.levelId
        selectedRole = role
      }
    })
    return selectedRole
  }
}

module.exports = LoginService