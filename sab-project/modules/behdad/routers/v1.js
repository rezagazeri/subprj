// url namespace
let urlNS = '/v1/behdad/'
const {Context} = require('../../../context/context')
const {getAction} = require('../../../utils/express')

module.exports = function (app, /** @type {Context} */ ctx) {
  let bankAccount = require('../controllers/v1/bank_account')
  app.get(urlNS + 'bank_accounts', getAction(ctx, bankAccount.get))

  let identifier = require('../controllers/v1/identifier')
  app.get(urlNS + 'identifiers', getAction(ctx, identifier.get))

  let transaction = require('../controllers/v1/transaction')
  app.get(urlNS + 'identifiers', getAction(ctx, transaction.get))
}