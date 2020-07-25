let fs = require('fs')
let path = require('path')

/**
 *
 * @param app
 * @param ctx
 * @returns void
 */
module.exports = (app, ctx) => {
  importRouters(app, ctx, path.join(__dirname))
  let moduleFolder = path.join(__dirname, '../modules')
  fs.readdirSync(moduleFolder).forEach((file) => {
    if (fs.statSync(path.join(moduleFolder, file)).isDirectory()) {
      if (fs.existsSync(path.join(moduleFolder, file, 'routers'))) {
        importRouters(app, ctx, path.join(moduleFolder, file, 'routers'))
      }
    }
  })
}

/**
 *
 * @param app
 * @param address
 * @returns void
 */
function importRouters (app, ctx, address) {
  fs.readdirSync(address).forEach(function (file) {
    if (file !== 'index.js') {
      require(path.join(address, file))(app, ctx)
    }
  })
}