const BaseService = require('../../../services/BaseService')
const AccountNumberService = require('./AccountNumberService')
const BehdadService = require('./BehdadService')
const CustomerService = require('./CustomerService')
const moment = require('moment-jalaali')

class IdentifierService extends BaseService {
  constructor (options = {}) {
    options.repo = require('../repository/IdentifierRepository')
    super(options)
  }

  async getIdentifiers () {
    return new Promise(async (resolve, reject) => {
      try {
        const AccountNumber = new AccountNumberService()
        this.accountNumbers = await AccountNumber.getAll()
        this.accountNumbers.map(async accountNumber => {
          const behdad = new BehdadService({
            username: accountNumber.account.username,
            password: accountNumber.account.password,
          })
          this.processIdentifiers(
            await behdad.getIdentifiers(accountNumber.accountNumber, ...IdentifierService.dateRange()),
            accountNumber)
        })
        resolve()
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  static dateRange () {
    let now = new Date()
    return [
      new Date(constants.behdad.identifier.startDate),
      new Date(now.setMonth(now.getMonth() + constants.behdad.identifier.endDatePad)),
    ]
  }

  async processIdentifiers (identifiers, behdadAccountNumberModel) {
    return new Promise(async (resolve, reject) => {
      try {
        const Customer = new CustomerService()
        identifiers.map(async identifier => {
          let customerModel = await Customer.checkCustomerIdentifierWithBehdadIdentifier(identifier.identifier)
          let behdadIdentifierModel = await this.checkBehdadIdentifier(identifier.identifier)
          await this.insertOrUpdateIdentifier(
            identifier,
            behdadAccountNumberModel,
            customerModel,
            behdadIdentifierModel)
        })
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  async checkBehdadIdentifier (identifier) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(this.repo.findIdentifier({identifier}))
      } catch (e) {
        reject(e)
      }
    })
  }

  async insertOrUpdateIdentifier (identifier, behdadAccountNumberModel, customerModel, behdadIdentifierModel) {
    return new Promise(async (resolve, reject) => {
      try {
        if (behdadIdentifierModel) {
          // TODO
          resolve(behdadIdentifierModel)
        } else {
          let options = {
            behdadAccountNumberId: behdadAccountNumberModel.id,
            identifier: identifier.identifier,
            customerId: customerModel ? customerModel.id : null,
            isActive: !!identifier.active,
            startDate: moment(identifier.startDate, 'jYYYYjMMjDD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(identifier.endDate, 'jYYYYjMMjDD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
            lastUpdate: moment(identifier.lastUpdate, 'jYYYYjMMjDD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss'),
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
}

module.exports = IdentifierService