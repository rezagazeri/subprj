// url namespace
let urlNS = '/v1/file/'
const {Context} = require('../../../context/context')
const {getAction} = require('../../../utils/express')

module.exports = function (app, /** @type {Context} */ ctx) {

  let fileController = require('../controllers/v1/file')
  app.get(urlNS + 'transactions', getAction(ctx, fileController.transactions))
  app.get(urlNS + 'region_area_transactions', getAction(ctx, fileController.transactions))
  app.get(urlNS + 'list_all_transactions', getAction(ctx, fileController.transactions))
  app.get(urlNS + 'invalid_transactions', getAction(ctx, fileController.transactions))

}