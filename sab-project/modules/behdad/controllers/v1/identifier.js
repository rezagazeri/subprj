module.exports = {

  get: async (ctx, req, res) => {
    const IdentifierService = require('../../services/IdentifierService')
    const response = new services.ResponseService(res, req)
    const Identifier = new IdentifierService({})
    response.send(200, await Identifier.getIdentifiers())
  },

}