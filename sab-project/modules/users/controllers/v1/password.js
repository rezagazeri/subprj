const ResponseService = require('../../../../services/ResponseService')

module.exports = {

  forget: async (ctx, req, res) => {
    const response = new ResponseService(res, req)
    const PasswordService = require('../../services/PasswordService')
    let options = {
      identifier: req.body.identifier,
    }
    const Password = new PasswordService(options)
    response.send(200, await Password.forget())
  },

  change: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const PasswordService = require('../../services/PasswordService')
    let options = {
      user: user,
      userId: req.user.id,
      changePassword: {
        old: req.body.old,
        new: req.body.new,
      },
    }
    const Password = new PasswordService(options)
    response.send(200, await Password.change())
  },

  reset: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const PasswordService = require('../../services/PasswordService')
    let options = {
      user: user,
      userId: req.body.userId,
    }
    const Password = new PasswordService(options)
    response.send(200, await Password.reset())
  },

}