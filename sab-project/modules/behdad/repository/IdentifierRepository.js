const BaseRepository = require('../../../repository/BaseRepository')
const Op = db.mysql.Sequelize.Op

class IdentifierRepository extends BaseRepository {
  constructor () {
    super({model: db.mysql.behdadIdentifiers})
  }

  async findIdentifier (options) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await super._findOne({where: {identifier: options.identifier}}))
      } catch (e) {
        reject(e)
      }
    })
  }
}

module.exports = IdentifierRepository