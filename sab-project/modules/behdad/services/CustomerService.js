const BaseService = require('../../../services/BaseService')

class CustomerService extends BaseService {
  constructor (options = {}) {
    options.repo = require('../repository/CustomerRepository')
    super(options)
  }

  async checkCustomerIdentifierWithBehdadIdentifier (identifier) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(this.repo.findCustomerByIdentifier({identifier}))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }
}

module.exports = CustomerService