const UserRepository = require('../repository/UserRepository')
const UserAuthTokensRepository = require('../repository/UserAuthTokensRepository')
const RolePageActionRepository = require('../repository/RolePageActionRepository')
const LoginService = require('./LoginService')

class AuthService {
  constructor (authToken, endPoint, method) {
    this.repos = {
      user: new UserRepository(),
      userAuthTokens: new UserAuthTokensRepository(),
      rolePageAction: new RolePageActionRepository(),
    }
    this.authToken = authToken
    this.endPoint = AuthService.rebaseEndPoint(endPoint)
    this.method = method
  }

  async validate () {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.open) {
          resolve(true)
        } else if (this.method === constants.user.role.access.method.options) {
          resolve(true)
        } else {
          this.userAthToken = await this.repos.userAuthTokens.getUserByToken({authToken: this.authToken || ''})
          await this.__validateUserAuthToken()
          if (await this.repos.rolePageAction.checkUserAccess({
            roles: AuthService.getRoles(this.userAthToken),
            endPoint: this.endPoint,
            method: this.method,
          }) || true) {
            await this.__logAccess()
            resolve(LoginService.generateResponse(this.userAthToken.user))
          } else {
            // TODO logging
            console.log('access Denied')
            reject(new error.AccessDeniedError())
          }
        }
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  static getRoles (object) {
    return object.user.roles.map(role => {return role.roleId})
  }

  get open () {
    let element = this.method + ':' + this.endPoint
    return constants.inArray(element, constants.user.auth.openWebServices)
  }

  get notUpdate () {
    let element = this.method + ':' + this.endPoint
    return constants.inArray(element, constants.user.auth.noUpdateWebServices)
  }

  static rebaseEndPoint (endPoint) {
    let urlArray = endPoint.split('?')
    urlArray = urlArray[0].split('/')
    let resultArray = urlArray.map(item => {
      if (Number.isSafeInteger(parseInt(item))) {
        return '$$param$$'
      } else {
        return item
      }
    })
    return resultArray.join('/')
  }

  async __validateUserAuthToken () {
    return new Promise(async (resolve, reject) => {
      if (this.userAthToken) {
        let update = Date.parse(this.userAthToken.updatedAt)
        let expire = constants.user.auth.token.expirationDuration * 60 * 1000
        if ((update + expire) > (Date.now())) {
          resolve(true)
        } else {
          // TODO logging and error handling
          console.log('expired time.')
          reject(new error.ExpiredTokenError())
        }
      } else {
        // TODO logging and error handling
        console.log('authToken not valid.')
        reject(new error.InvalidTokenError())
      }
    })
  }

  async __logAccess () {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.notUpdate) {
          this.userAthToken = await this.repos.userAuthTokens.logAccess({model: this.userAthToken})
        }
        resolve(this.userAthToken)
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

}

module.exports = AuthService