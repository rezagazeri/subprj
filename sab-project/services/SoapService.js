const soap = require('soap')

class SoapService {
  constructor (options) {
    this.wsdl = options.wsdl
    this.username = options.username
    this.password = options.password
    if (options.certificate) {
      this.certificate = options.certificate
    } else {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      this.certificate = false
    }
    this.wsdlOptions = {}
    if (options.namespace) {
      this.wsdlOptions.overrideRootElement = {
        'namespace': 'myns',
        'xmlnsAttributes': [
          {
            'name': 'xmlns:myns',
            'value': options.namespace,
          }],
      }
    }
  }

  createClient () {
    return new Promise((resolve, reject) => {
      soap.createClient(this.wsdl, this.wsdlOptions, (err, client) => {
        if (err) {
          // TODO logging
          reject(new error.SoapError(err.code))
        } else {
          if (this.certificate) {
            client.setSecurity(new soap.ClientSSLSecurityPFX(
              this.certificate.file,
              this.certificate.password,
              {
                strictSSL: false,
                rejectUnauthorized: false,
                forever: true,
              },
            ))
          }
          resolve(client)
        }
      })
    })
  }

  callMethod (client, method, args) {
    return new Promise((resolve, reject) => {
      client[method](args, function (err, result) {
        if (err) {
          // TODO logging
          console.log(err)
          reject(new error.SoapError(err.code))
        } else {
          resolve(result)
        }
      })
    })
  }

}

module.exports = SoapService