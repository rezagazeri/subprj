module.exports = {

  get: async (ctx, req, res) => {
    const AccountNumberService = require('../../services/AccountNumberService')
    const response = new services.ResponseService(res, req)
    const AccountNumber = new AccountNumberService({})
    response.send(200, await AccountNumber.getAccountNumbers())
  },

}