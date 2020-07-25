const BaseRepository = require('../../../repository/BaseRepository')
const Op = db.mysql.Sequelize.Op
const http = require('http');

class FileRepository extends BaseRepository {
  constructor () {
    super({model: db.mysql.userList})
  }

  async getLoginInfo (options) {
    return new Promise(async (resolve, reject) => {
      try {
        let findOptions = {
          where: {username: options.username},
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
                  attributes: ['name', 'parentId', 'level'],
                  as: 'chartStructure',
                }],
            }],
        }
        resolve(await this._findOne(findOptions))
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async getUserByIdentifier (options) {
    return new Promise(async (resolve, reject) => {
      try {
        let findOptions = {
          where: {
            [Op.or]: [
              {username: options.identifier},
              {email: options.identifier},
              {mobile: options.identifier},
            ],
          },
        }
        resolve(await this._findOne(findOptions))
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async successfulLogin (options) {
    return new Promise(async (resolve, reject) => {
      try {
        options.model.lastLoginDate = new Date()
        options.model.loginCount++
        let updateOptions = {fields: ['lastLoginDate', 'loginCount']}
        resolve(await this._updateModel(options.model, updateOptions))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async list (options) {
    return new Promise(async (resolve, reject) => {
      try {
        let findParams = {
          attributes: [
            'id',
            'fullName',
            'genderId',
            'username',
            'email',
            'mobile',
            'lastLoginDate',
            'loginCount',
            'lastActivityDate',
            'lastActivityUrl',
            'registerDate',
            'situationId',
          ],
          where: {},
        }
        if (options.filter.fullName) {
          findParams.where.fullName = {[Op.like]: '%' + options.filter.fullName + '%'}
        }
        if (options.filter.username) {
          findParams.where.username = {[Op.like]: '%' + options.filter.username + '%'}
        }
        if (options.filter.email) {
          findParams.where.email = {[Op.like]: '%' + options.filter.email + '%'}
        }
        if (options.filter.loginCount) {
          findParams.where.loginCount = options.filter.loginCount
        }
        if (options.filter.lastActivityUrl) {
          findParams.where.lastActivityUrl = {[Op.like]: '%' + options.filter.lastActivityUrl + '%'}
        }
        if (options.filter.lastLoginDateFrom || options.filter.lastLoginDateTo) {
          findParams.where.lastLoginDate = this._getDateRange(
            new Date(parseInt(options.filter.lastLoginDateFrom)),
            new Date(parseInt(options.filter.lastLoginDateTo)), Op)
        }
        if (options.filter.registerDateFrom || options.filter.registerDateTo) {
          findParams.where.lastLoginDate = this._getDateRange(
            new Date(parseInt(options.filter.registerDateFrom)),
            new Date(parseInt(options.filter.registerDateTo)), Op)
        }
        findParams.pagination = options.pagination
        resolve(await super.list(findParams))
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }



}

module.exports = FileRepository