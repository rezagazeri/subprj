const ResponseService = require('../../../../services/ResponseService')
const CaptchaService = require('../../services/CaptchaService');
const redis = require('redis');
const bluebird = require('bluebird')
bluebird.promisifyAll(redis)

const client = redis.createClient(6379, '127.0.0.1');


module.exports = {

  login: async (ctx, req, res) => {
    const response = new ResponseService(res, req)
    // In case there are some required parameters missing.
    if(process.env.NODE_ENV ==="production" )
      if(req.body===undefined || req.body.captchaValue===undefined || req.body.captchaId===undefined)
        response.send(400, {'error':'A required parameter is missing.'})

    const LoginService = require('../../services/LoginService')
    let options = {
      username: req.body.username,
      password: req.body.password,
      captcha_value:req.body.captchaValue,
      captcha_id:req.body.captchaId
    }
    const Login = new LoginService(options)
    const loginResponse = await Login.login()
    const authToken = loginResponse.authToken
    if (process.env.NODE_ENV === 'production') {
      delete loginResponse.authToken
    }
    response.send(200, loginResponse, authToken)
  },

  logout: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const LoginService = require('../../services/LoginService')
    let options = {user: user}
    const Login = new LoginService(options)
    response.send(200, await Login.logout(), '')
  },

  update: async (ctx, req, res, user) => {
    const response = new ResponseService(res, req)
    const LoginService = require('../../services/LoginService')
    let options = {user: user}
    const Login = new LoginService(options)
    response.send(200, await Login.update())
  },
  getCaptcha: async (ctx, req, res) => {
    const response = new ResponseService(res, req)
    const captcha = new CaptchaService();
    const cap = await captcha.create(client);
    //const capVer = await captcha.verify(client,cap.id,cap.image);

    response.send(200, {CaptchaId:cap.id, CaptchaImage:cap.image})
  },

}