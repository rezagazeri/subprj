const BaseRepository = require('../../../repository/BaseRepository')
const Op = db.mysql.Sequelize.Op

class TransactionRepository extends BaseRepository {
  constructor () {
    super({model: db.mysql.transactions})
  }
}

module.exports = TransactionRepository