const BaseService = require('../../../services/BaseService')

class UserRoleService extends BaseService {
  constructor (options = {}) {
    options.repo = require('../repository/UserRoleRepository')
    super(options)
    if (options.role) {
      this.role = options.role
    }
  }

  async assignRolesToUser () {
    return new Promise(async (resolve, reject) => {
      try {
        let items = []
        this.params.roles.map(item => {
          items.push({
            userId: this.filter.id,
            roleId: item.id,
            oilChartStructureId: item.chartStructureId,
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

module.exports = UserRoleService