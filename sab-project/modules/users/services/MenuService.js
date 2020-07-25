const BaseService = require('../../../services/BaseService')

class LoginService extends BaseService {

  constructor (options = {}) {
    options.repo = require('../repository/MenuItemsRepository')
    super(options)
  }

  async getUserMenu () {
    return new Promise(async (resolve, reject) => {
      try {
        const menu = await this.repo.getUserMenu({user: this.user})
        resolve(this.__generateResponse(menu))
      } catch (e) {

        reject(e)
      }
    })
  }

  async getAllMenu () {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('1')
        const menu = await this.repo.getAllMenu()
        resolve(this.__generateResponse(menu))
      } catch (e) {
        reject(e)
      }
    })
  }

  __generateResponse (menu) {
    let response = []
    if (Array.isArray(menu) && menu.length) {
      menu.map(item => {
        let menu = {
          id: item.id,
          slug: item.slug,
          title: item.title,
          children: this.__generateResponse(item.children),
          pageActions: [],
        }
        item.pageActions.map(pageAction => {
          if (pageAction && pageAction.permittedAction && pageAction.permittedAction.name) {
            menu.pageActions.push(pageAction.permittedAction.name)
          }
        })
        response.push(menu)
      })
    }
    return response
  }

}

module.exports = LoginService