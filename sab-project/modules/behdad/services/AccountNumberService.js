const BaseService = require('../../../services/BaseService')
const AccountService = require('./AccountService')
const BehdadService = require('./BehdadService')
const BankAccountsService = require('./BankAccountsService')

class AccountNumberService extends BaseService {
  constructor (options = {}) {
    options.repo = require('../repository/AccountNumberRepository')
    super(options)
  }

  async getAccountNumbers () {
    return new Promise(async (resolve, reject) => {
      try {
        const Account = new AccountService({})
        this.accounts = await Account.getAll()
        this.accounts.map(async account => {
          const behdad = new BehdadService({
            username: account.username,
            password: account.password,
          })
          this.processAccountNumbers(await behdad.getAccountNumbers(), account)
        })
        resolve()
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async processAccountNumbers (accountNumbers, behdadAccountModel) {
    return new Promise(async (resolve, reject) => {
      try {
        const BankAccounts = new BankAccountsService()
        accountNumbers.map(async accountNumber => {
          let bankAccountModel = await BankAccounts.checkBankAccountWithBehdadAccountNumber(accountNumber)
          let behdadAccountNumberModel = await this.checkBehdadAccountNumber(accountNumber)
          await this.insertOrUpdateAccountNumber(
            accountNumber,
            behdadAccountModel,
            bankAccountModel,
            behdadAccountNumberModel)
        })
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  async checkBehdadAccountNumber (accountNumber) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(this.repo.findAccountNumber({accountNumber}))
      } catch (e) {
        reject(e)
      }
    })
  }

  async insertOrUpdateAccountNumber (accountNumber, behdadAccountModel, bankAccountModel, behdadAccountNumberModel) {
    return new Promise(async (resolve, reject) => {
      try {
        if (behdadAccountNumberModel) {
          // TODO
          resolve(behdadAccountNumberModel)
        } else {
          let options = {
            accountNumber,
            bankAccountId: bankAccountModel ? bankAccountModel.id : null,
            behdadAccountId: behdadAccountModel.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          resolve(this.repo.register(options))
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  async getAll () {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          include: [
            {
              model: db.mysql.behdadAccounts,
              as: 'account',
            }],
        }
        resolve(await super.getAll(options))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }
}

module.exports = AccountNumberService