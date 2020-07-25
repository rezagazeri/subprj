const BaseService = require('../../../services/BaseService')
const RolePageActionService = require('./RolePageActionService')

class RoleService extends BaseService {
  constructor (options = {}) {
    options.repo = require('../repository/RoleRepository')
    super(options)
  }

  async create () {
    return new Promise(async (resolve, reject) => {
      try {
        const role = await super.create(this.params)
        const rolePageAction = new RolePageActionService({role: role})
        await rolePageAction.bulkAssignToRole(this.params.pageActions)
        resolve(role)
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }
}

module.exports = RoleService