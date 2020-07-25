const BaseRepository = require('../../../repository/BaseRepository')

class MenuItemsRepository extends BaseRepository {
  constructor () {
    super({model: db.mysql.menuItems})
  }

  async getUserMenu (options) {
    return new Promise(async (resolve, reject) => {
      try {
        let findOptions = {
          where: {parentId: null, flagId: 1},
          attributes: ['id', 'slug', 'parentId', 'title'],
          include: [
            {
              model: db.mysql.menuItems,
              as: 'children',
              where: {flagId: 1},
              attributes: ['id', 'slug', 'parentId', 'title'],
              include: [
                {
                  model: db.mysql.pageActions,
                  as: 'pageActions',
                  required: true,
                  include: [
                    {
                      model: db.mysql.menuPermittedActions,
                      as: 'permittedAction',
                    }, {
                      model: db.mysql.rolePageActions,
                      as: 'rolePageActions',
                      required: true,
                      include: [
                        {
                          model: db.mysql.roleList,
                          as: 'role',
                          required: true,
                          include: [
                            {
                              model: db.mysql.userRoles,
                              as: 'userRoles',
                              required: true,
                              where: {userId: options.user.id},
                            }],
                        }],
                    }],
                }],
            }, {
              model: db.mysql.pageActions,
              as: 'pageActions',
              required: true,
              include: [
                {
                  model: db.mysql.menuPermittedActions,
                  as: 'permittedAction',
                }, {
                  model: db.mysql.rolePageActions,
                  as: 'rolePageActions',
                  required: true,
                  include: [
                    {
                      model: db.mysql.roleList,
                      as: 'role',
                      required: true,
                      include: [
                        {
                          model: db.mysql.userRoles,
                          as: 'userRoles',
                          required: true,
                          where: {userId: options.user.id},
                        }],
                    }],
                }],
            }],
        }
        resolve(await this._findAll(findOptions))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async getAllMenu () {
    return new Promise(async (resolve, reject) => {
      try {
        let findOptions = {
          where: {parentId: null},
          attributes: ['id', 'slug', 'parentId', 'title'],
          include: [
            {
              model: db.mysql.menuItems,
              as: 'children',
              where: {flagId: 1},
              attributes: ['id', 'slug', 'parentId', 'title'],
              include: [
                {
                  model: db.mysql.pageActions,
                  as: 'pageActions',
                  required: true,
                  include: [
                    {
                      model: db.mysql.menuPermittedActions,
                      as: 'permittedAction',
                    }],
                }],
            }, {
              model: db.mysql.pageActions,
              as: 'pageActions',
              required: true,
              include: [
                {
                  model: db.mysql.menuPermittedActions,
                  as: 'permittedAction',
                }],
            }],
        }
        resolve(await this._findAll(findOptions))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }
}

module.exports = MenuItemsRepository