const ResponseService = require('../../../../services/ResponseService')

module.exports = {

  list: async (ctx, req, res, user) => {
    const UserService = require('../../services/UserService')
    const response = new ResponseService(res, req)
    const defaults = constants.pagination.defaults
    const orders = [
      'id',
      'fullName',
      'username',
      'email',
      'lastLoginDate',
      'loginCount',
      'lastActivityUrl',
      'registerDate',
    ]
    let options = {
      ctx:ctx,
      pagination: {
        page: req.query.page || defaults.page,
        pageSize: req.query.pageSize || defaults.pageSize,
        order: constants.inArray(req.query.order, orders) ? req.query.order : defaults.order,
        orderType: constants.inArray(req.query.orderType, constants.pagination.orderTypes)
          ? req.query.orderType
          : defaults.orderType,
      },
      user: user,
      filter: req.query,
    }
    const User = new UserService(options)
    response.send(200, await User.list(ctx))
  },

  getMe: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const UserService = require('../../services/UserService')
    let options = {
      user: user,
      filter: {id: req.user.id},
    }
    const User = new UserService(options)
    response.send(200, await User.get())
  },

  get: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const UserService = require('../../services/UserService')
    let options = {
      user: user,
      filter: {id: req.params.id},
    }
    const User = new UserService(options)
    response.send(200, await User.get())
  },

  update: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const UserService = require('../../services/UserService')
    let options = {
      user: user,
      filter: {id: req.params.id},
      params: req.body,
    }
    const User = new UserService(options)
    response.send(200, await User.update())
  },

  create: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const UserService = require('../../services/UserService')
    let options = {
      user: user,
      params: req.body,
    }
    const User = new UserService(options)
    response.send(200, await User.create())
  },

  activate: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const UserService = require('../../services/UserService')
    let options = {
      user: user,
      filter: {id: req.params.id},
      params: {situationId: constants.user.situation.accepted},
    }
    const User = new UserService(options)
    response.send(200, await User.update())
  },

  deactivate: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const UserService = require('../../services/UserService')
    let options = {
      user: user,
      filter: {id: req.params.id},
      params: {situationId: constants.user.situation.rejected},
    }
    const User = new UserService(options)
    response.send(200, await User.update())
  },

  block: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const UserService = require('../../services/UserService')
    let options = {
      user: user,
      filter: {id: req.params.id},
      params: {situationId: constants.user.situation.blocked},
    }
    const User = new UserService(options)
    response.send(200, await User.update())
  },

  addRole: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const UserRoleService = require('../../services/UserRoleService')
    let options = {
      user: user,
      filter: {id: req.params.id},
      params: {roles: req.body.roles},
    }
    const UserRole = new UserRoleService(options)
    response.send(200, await UserRole.assignRolesToUser())
  },

}