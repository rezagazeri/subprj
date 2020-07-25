const BaseRepository = require('../../../repository/BaseRepository')
const Op = db.mysql.Sequelize.Op

class BankAccountsRepository extends BaseRepository {
  constructor () {
    super({model: db.mysql.bankAccounts})
  }

  async findBankAccountByAccountNumber (options) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await super._findOne({where: {accountNumber: options.accountNumber}}))
      } catch (e) {
        reject(e)
      }
    })
  }

}

module.exports = BankAccountsRepository