const BaseService = require('../../../services/BaseService')

class RolePageActionService extends BaseService {
  constructor (options = {}) {
    options.repo = require('../repository/RolePageActionRepository')
    super(options)
    if (options.role) {
      this.role = options.role
    }
  }

  async bulkAssignToRole (list) {
    return new Promise(async (resolve, reject) => {
      try {
        let items = []
        list.map(item => {
          items.push({
            roleId: this.role.id,
            pageActionId: item,
          })
        })
        resolve(await this.repo.bulkInsert(items))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }
}

module.exports = RolePageActionService