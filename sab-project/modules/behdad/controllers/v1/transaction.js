module.exports = {

  get: async (ctx, req, res) => {
    const { BehdadTransactions } = require('../../services/TransactionService')
    const response = new services.ResponseService(res, req)
    const behdad = new BehdadTransactions()
    response.send(200, await behdad.getTransactions())
  },

}