const BaseRepository = require('../../../repository/BaseRepository')

class UserAuthTokensRepository extends BaseRepository {
  constructor () {
    super({model: db.mysql.userAuthTokens})
  }

  async getUserByToken (options) {
    return new Promise(async (resolve, reject) => {
      try {
        if (options.authToken === '') {
          // TODO logging and error handling
          console.log('authToken not valid.')
          reject(new error.InvalidTokenError())
        } else {
          let findOptions = {
            where: {
              authToken: options.authToken,
              active: 1,
            },
            include: [
              {
                model: db.mysql.userList,
                as: 'user',
                include: [
                  {
                    model: db.mysql.userRoles,
                    attributes: ['roleId', 'oilChartStructureId'],
                    as: 'roles',
                    include: [
                      {
                        model: db.mysql.roleList,
                        attributes: ['name', 'userLevelId'],
                        as: 'role',
                        include: [
                          {
                            model: db.mysql.userLevels,
                            attributes: ['name'],
                            as: 'level',
                          }],
                      }, {
                        model: db.mysql.oilChartStructure,
                        attributes: ['id', 'name', 'parentId', 'level'],
                        as: 'chartStructure',
                      }],
                  }],
              }],
          }
          resolve(await this._findOne(findOptions))
        }
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async disableAllTokenByUserId (options) {
    return new Promise(async (resolve, reject) => {
      try {
        let set = {active: 0}
        let updateOptions = {where: {userId: options.userId}}
        resolve(await this._update(set, updateOptions))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async insertNewToken (options) {
    return new Promise(async (resolve, reject) => {
      try {
        let insertOptions = {
          userId: options.userId,
          authToken: options.authToken,
          usageCount: 0,
          active: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        resolve(await this._insert(insertOptions))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async logAccess (options) {
    return new Promise(async (resolve, reject) => {
      try {
        options.model.updatedAt = new Date()
        options.model.usageCount++
        let updateOptions = {fields: ['updatedAt', 'usageCount']}
        resolve(await this._updateModel(options.model, updateOptions))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }
}

module.exports = UserAuthTokensRepository