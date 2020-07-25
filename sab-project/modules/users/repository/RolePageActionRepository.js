const BaseRepository = require('../../../repository/BaseRepository')
const Op = db.mysql.Sequelize.Op

class RolePageActionRepository extends BaseRepository {
  constructor () {
    super({model: db.mysql.rolePageActions})
  }

  async checkUserAccess (options) {
    return new Promise(async (resolve, reject) => {
      try {
        let findOptions = {
          where: {roleId: {[Op.in]: options.roles}},
          include: [
            {
              model: db.mysql.pageActions,
              as: 'pageActions',
              required: true,
              include: [
                {
                  model: db.mysql.accessList,
                  as: 'access',
                  required: true,
                  where: {
                    endpoint: options.endPoint,
                    methodId: constants.user.role.access.method[options.method],
                  },
                }],
            }],
        }
        resolve(!!await this._findOne(findOptions))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }
}

module.exports = RolePageActionRepository