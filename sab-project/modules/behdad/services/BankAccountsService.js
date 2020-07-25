const BaseService = require('../../../services/BaseService')

class BankAccountsService extends BaseService {
  constructor (options = {}) {
    options.repo = require('../repository/BankAccountsRepository')
    super(options)
  }

  async checkBankAccountWithBehdadAccountNumber (accountNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(this.repo.findBankAccountByAccountNumber({accountNumber}))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }
}

module.exports = BankAccountsService