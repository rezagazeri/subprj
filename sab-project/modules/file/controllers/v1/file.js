const ResponseService = require('../../../../services/ResponseService')
const http = require('http');

module.exports = {

  transactions: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const UserService = require('../../services/FileService')
    let options = {
      user: user,
      filter: {id: req.user.id},
    }
    const User = new UserService(options)

    try {
      let http_promise = User.getPromise(req.originalUrl);
      let rett = (await http_promise);
      //console.log(JSON.parse(JSON.stringify({file:rett.replace(/"/g,'')})))
      response.send(200,JSON.parse(JSON.stringify({file:"https://sup.cab-in.com/"+rett.replace(/"/g,'')})));
      // holds response from server that is passed when Promise is resolved
    }
    catch(error) {
      // Promise rejected
      console.log(error);
    }

  },

  region_area_transactions: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const UserService = require('../../services/FileService')
    let options = {
      user: user,
      filter: {id: req.params.id},
    }
    const User = new UserService(options)
    response.send(200, await User.get())
  },



}