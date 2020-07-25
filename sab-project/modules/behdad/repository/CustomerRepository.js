const BaseRepository = require('../../../repository/BaseRepository')

class CustomerRepository extends BaseRepository {
  constructor () {
    super({ model: db.mysql.customers })
  }

  async findCustomerByIdentifier (options) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await super._findOne({
          where: { depositId: options.identifier },
          include: [{
            model: db.mysql.customerAllowedBankAccounts,
            as: 'allowedBankAccounts'
          }]
        }))
      } catch (e) {
        reject(e)
      }
    })
  }

}

module.exports = CustomerRepository