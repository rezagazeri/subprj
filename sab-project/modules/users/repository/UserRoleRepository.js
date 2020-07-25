const BaseRepository = require('../../../repository/BaseRepository')

class UserRoleRepository extends BaseRepository {
  constructor () {
    super({model: db.mysql.userRoles})
  }
}

module.exports = UserRoleRepository