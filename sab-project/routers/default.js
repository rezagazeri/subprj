// url namespace
let uns = '/'
//controller namespace
let cns = '../controllers/'
module.exports = function (app) {
  app.use(uns + 'test', require(cns + 'test'))
}