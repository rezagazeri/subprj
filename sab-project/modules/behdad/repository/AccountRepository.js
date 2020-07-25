const BaseRepository = require('../../../repository/BaseRepository')
const Op = db.mysql.Sequelize.Op

class AccountRepository extends BaseRepository {
  constructor () {
    super({ model: db.mysql.behdadAccounts })
  }

  async list (options) {
    return new Promise(async (resolve, reject) => {
      try {
        let findParams = {
          attributes: ['id', 'name', 'description'],
          where: {},
          include: [
            {
              model: db.mysql.userLevels,
              as: 'level',
              attributes: ['id', 'name'],
            }],
        }
        if (options.filter.userLevelId) {
          findParams.where.userLevelId = options.filter.userLevelId
        }
        if (options.filter.name) {
          findParams.where.name = { [Op.like]: '%' + options.filter.name + '%' }
        }
        findParams.pagination = options.pagination
        resolve(await super.list(findParams))
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async register (options) {
    return new Promise(async (resolve, reject) => {
      try {
        options.flagId = constants.flags.active
        resolve(await super.register(options))
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async getLastUpdate () {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this._max('lastUsedAt'))
      } catch (e) {
        reject(e)
      }
    })
  }

  async setLastUpdate (model, date) {
    return new Promise(async (resolve, reject) => {
      try {
        model.lastUsedAt = date
        resolve(await this._updateModel(model, { fields: ['lastUsedAt'] }))
      } catch (e) {
        reject(e)
      }
    })
  }
}

module.exports = AccountRepository