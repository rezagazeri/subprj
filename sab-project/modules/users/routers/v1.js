// url namespace
let urlNS = '/v1/user/'
const {Context} = require('../../../context/context')
const {getAction} = require('../../../utils/express')

module.exports = function (app, /** @type {Context} */ ctx) {
  let loginController = require('../controllers/v1/login')
  app.post(urlNS + 'login', getAction(ctx, loginController.login))
  app.get(urlNS + 'captcha', getAction(ctx, loginController.getCaptcha))
  app.post(urlNS + 'logout', getAction(ctx, loginController.logout))
  app.get(urlNS + 'update', getAction(ctx, loginController.update))

  let passwordController = require('../controllers/v1/password')
  app.post(urlNS + 'password/forget', getAction(ctx, passwordController.forget))
  app.post(urlNS + 'password/change', getAction(ctx, passwordController.change))
  app.post(urlNS + 'password/reset', getAction(ctx, passwordController.reset))

  let menuController = require('../controllers/v1/menu')
  app.get(urlNS + 'menu', getAction(ctx, menuController.index))

  let userController = require('../controllers/v1/user')
  app.get(urlNS + 'users', getAction(ctx, userController.list))
  app.get(urlNS + 'user/me', getAction(ctx, userController.getMe))
  app.get(urlNS + 'user/:id', getAction(ctx, userController.get))
  app.patch(urlNS + 'user/:id', getAction(ctx, userController.update))
  app.post(urlNS + 'user', getAction(ctx, userController.create))
  app.patch(urlNS + 'user/:id/activate', getAction(ctx, userController.activate))
  app.patch(urlNS + 'user/:id/deactivate', getAction(ctx, userController.deactivate))
  app.patch(urlNS + 'user/:id/block', getAction(ctx, userController.block))
  app.post(urlNS + 'user/:id/role', getAction(ctx, userController.addRole))

  let roleController = require('../controllers/v1/role')
  app.get(urlNS + 'roles', getAction(ctx, roleController.list))
  app.get(urlNS + 'role/menu', getAction(ctx, roleController.roleMenu))
  app.get(urlNS + 'role/:id', getAction(ctx, roleController.get))
  app.patch(urlNS + 'role/:id', getAction(ctx, roleController.update))
  app.post(urlNS + 'role', getAction(ctx, roleController.create))
  app.patch(urlNS + 'role/:id/activate', getAction(ctx, roleController.activate))
  app.patch(urlNS + 'role/:id/deactivate', getAction(ctx, roleController.deactivate))
}