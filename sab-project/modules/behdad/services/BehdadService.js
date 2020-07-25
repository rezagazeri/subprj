const moment = require('moment-jalaali')
const SOAPService = require('../../../services/SoapService')
const fs = require('fs')
const path = require('path')

class BehdadService {
  constructor (options = {}) {
    this.username = options.username
    this.password = options.password
  }

  async getAccountNumbers () {
    return new Promise(async (resolve, reject) => {
      try {
        const start = Date.now()
        const soap = new SOAPService({
          wsdl: constants.behdad.account.wsdl(),
          namespace: constants.behdad.account.namespace,
          certificate: constants.behdad.account.certificate(),
        })
        const client = await soap.createClient()
        const result = await soap.callMethod(client, 'getAccountNumbers', {
          arg0: {
            username: this.username,
            password: this.password,
          },
        })
        BehdadService.logIntoFile(constants.behdad.account.logFolder, 'accountNumbers', result.return, start)
        resolve(result.return)
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async getIdentifiers (accountNumber, startDate, endDate) {
    return new Promise(async (resolve, reject) => {
      try {
        const start = Date.now()
        const soap = new SOAPService({
          wsdl: constants.behdad.identifier.wsdl(),
          namespace: constants.behdad.identifier.namespace,
          certificate: constants.behdad.identifier.certificate(),
        })
        const client = await soap.createClient()
        const result = await soap.callMethod(client, 'getActiveIdentifiers', {
          arg0: {
            username: this.username,
            password: this.password,
          },
          accountNumber: accountNumber,
          startShamsiDate: (moment(startDate).format('jYYYYjMjD')) + '000000',
          endShamsiDate: (moment(endDate).format('jYYYYjMjD')) + '000000',
        })
        BehdadService.logIntoFile(constants.behdad.identifier.logFolder, 'identifiers', result.return, start)
        resolve(result.return)
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async getTransactions (accountNumber, startDate, endDate, page, pageSize = constants.behdad.transaction.pageSize) {
    return new Promise(async (resolve, reject) => {
      try {
        const start = Date.now()
        const soap = new SOAPService({
          wsdl: constants.behdad.account.wsdl(),
          namespace: constants.behdad.account.namespace,
          certificate: constants.behdad.account.certificate(),
        })
        const client = await soap.createClient()
        const result = await soap.callMethod(client, 'getBankTransactionsDetails', {
          arg0: {
            username: this.username,
            password: this.password,
          },
          arg1: {
            accountNumber: accountNumber,
            fromDateTime: (moment(startDate).format('jYYYYjMjD')) + '000000',
            toDateTime: (moment(endDate).format('jYYYYjMjD')) + '000000',
          },
          arg2: {
            pageNumber: page,
            recordCount: pageSize,
          },
        })
        BehdadService.logIntoFile(constants.behdad.identifier.logFolder, 'transactions', result.return, start)
        resolve(result.return)
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  static logIntoFile (folder, file, data, start) {
    fs.writeFileSync(path.join(folder, file + '-' + Date.now() + '.json'),
      JSON.stringify({start, end: Date.now(), data}))
  }
}

module.exports = BehdadService