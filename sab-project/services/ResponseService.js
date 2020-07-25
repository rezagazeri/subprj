class ResponseService {
  constructor (res, req) {
    this.res = res
    this.req = req
  }

  send (code, response, authToken = false) {
    if (authToken) {
      this.setCookie('authToken', authToken)
    } else if (this.req.user && this.req.user.authToken) {
      this.setCookie('authToken', this.req.user.authToken)
    }
    this.res.status(code).json(response)
  }

  setCookie (name, value) {
    this.res.cookie(name, value, {
      maxAge: constants.user.auth.token.expirationDuration * 60 * 1000,
      httpOnly: true,
    //   sameSite: true,
      secure: true,
    })
  }

}

module.exports = ResponseService