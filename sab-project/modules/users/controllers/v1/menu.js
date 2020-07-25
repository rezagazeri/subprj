const ResponseService = require('../../../../services/ResponseService')

module.exports = {

  index: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const MenuService = require('../../services/MenuService')
    let options = {user: user}
    const Menu = new MenuService(options)
    response.send(200, await Menu.getUserMenu())
  },

}