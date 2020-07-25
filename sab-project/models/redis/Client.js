const redis = require('redis')

class Client {
  constructor () {

  }

  async getClient () {
    if (!this.client) {
      this.client = await Client.getNewClient()
    }
    return this.client
  }

  static async getNewClient () {
    return new Promise((resolve, reject) => {
      const client = redis.createClient()
      client.on('error', function (err) {
        reject(err)
      })
      resolve(client)
    })
  }
}

module.exports = Client