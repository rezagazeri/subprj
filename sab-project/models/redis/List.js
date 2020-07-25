const Redis = require('./Client')

class List {
  constructor (options) {
    this.redis = new Redis()
    this.name = options.name
    if (options.config) {
      this.config = options.config
    } else {
      this.config = common.getConfig().redis.list
    }
  }

  async push (element, direction = this.config.push.direction) {
    return new Promise(async (resolve, reject) => {
      try {
        if (direction === constants.redis.list.direction.left) {
          resolve(await this.__lpush(element))
        } else {
          resolve(await this.__rpush())
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  async pop (block = false, direction = this.config.pop.direction) {
    return new Promise(async (resolve, reject) => {
      try {
        if (block) {
          if (direction === constants.redis.list.direction.left) {
            resolve(await this.__blpop(element))
          } else {
            resolve(await this.__brpop())
          }
        } else {
          if (direction === constants.redis.list.direction.left) {
            resolve(await this.__lpop(element))
          } else {
            resolve(await this.__rpop())
          }
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  empty () {
    return new Promise(async (resolve, reject) => {
      const client = await this.redis.getClient()
      const multi = client.multi()
      multi.lrange(this.name, start, end)
      multi.del(this.name)
      multi.exec((err, replies) => {
        if (err) {
          reject(err)
        } else {
          resolve(replies[0])
        }
      })
    })
  }

  range (start = 0, end = -1) {
    return new Promise(async (resolve, reject) => {
      const client = await this.redis.getClient()
      client.lrange(this.name, start, end, (err, reply) => {
        if (err) {
          reject(err)
        } else {
          resolve(reply)
        }
      })
    })
  }

  delete (element) {

  }

  async __lpush (element) {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await this.redis.getClient()
        client.lpush(this.name, element, err => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  async __rpush (element) {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await this.redis.getClient()
        client.rpush(this.name, element, err => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  async __blpop (timeout = 0) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.blpopClient) {
          this.blpopClient = await Redis.getNewClient()
        }
        this.blpopClient.blpop(this.name, timeout, (err, reply) => {
          if (err) {
            reject(err)
          } else {
            resolve(reply[1], reply[0])
          }
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  async __brpop (timeout = 0) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.brpopClient) {
          this.brpopClient = await Redis.getNewClient()
        }
        this.brpopClient.brpop(this.name, timeout, (err, reply) => {
          if (err) {
            reject(err)
          } else {
            resolve(reply[1], reply[0])
          }
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  async __lpop () {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await this.redis.getClient()
        client.lpop(this.name, (err, reply) => {
          if (err) {
            reject(err)
          } else {
            resolve(reply)
          }
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  async __rpop () {
    return new Promise(async (resolve, reject) => {
      try {
        const client = await this.redis.getClient()
        client.rpop(this.name, (err, reply) => {
          if (err) {
            reject(err)
          } else {
            resolve(reply)
          }
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}

module.exports = List