const ResponseService = require('../../../../services/ResponseService')

module.exports = {

  list: async (ctx, req, res, user) => {
    const RoleService = require('../../services/RoleService')
    const response = new services.ResponseService(res, req)
    const defaults = constants.pagination.defaults
    const orders = [
      'id',
      'userLevelId',
      'name',
    ]
    let options = {
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
    const Role = new RoleService(options)
    response.send(200, await Role.list())
  },

  get: async (ctx, req, res, user) => {
    const response = new services.ResponseService(res, req)
    const RoleService = require('../../services/RoleService')
    let options = {
      user: user,
      filter: {id: req.params.id},
    }
    const Role = new RoleService(options)
    response.send(200, await Role.get())
  },

  update: async (ctx, req, res, user) => {
    const response = new services.ResponseService(res, req)
    const RoleService = require('../../services/RoleService')
    let options = {
      user: user,
      filter: {id: req.params.id},
      params: req.body,
    }
    const Role = new RoleService(options)
    response.send(200, await Role.update())
  },

  activate: async (ctx, req, res, user) => {
    const response = new services.ResponseService(res, req)
    const RoleService = require('../../services/RoleService')
    let options = {
      user: user,
      filter: {id: req.params.id},
      params: {flagId: constants.flags.active},
    }
    const Role = new RoleService(options)
    response.send(200, await Role.update())
  },

  deactivate: async (ctx, req, res, user) => {
    const response = new services.ResponseService(res, req)
    const RoleService = require('../../services/RoleService')
    let options = {
      user: user,
      filter: {id: req.params.id},
      params: {flagId: constants.flags.deActive},
    }
    const Role = new RoleService(options)
    response.send(200, await Role.update())
  },

  create: async (ctx, req, res, user) => {
    const response = new services.ResponseService(res, req)
    const RoleService = require('../../services/RoleService')
    let options = {
      user: user,
      params: req.body,
    }
    const Role = new RoleService(options)
    response.send(200, await Role.create())
  },

  roleMenu: async (ctx, req, res, user) => {
    const response = new services.ResponseService(res, req)
    const MenuService = require('../../services/MenuService')
    let options = {}
    const Menu = new MenuService(options)
    response.send(200, await Menu.getAllMenu())
  },

}