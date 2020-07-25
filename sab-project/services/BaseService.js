class BaseService {
  constructor (options) {
    if(options.repo) {
      this.repo = new options.repo()
    }
    if (options.user) {
      this.user = options.user
    }
    if (options.pagination) {
      this.pagination = options.pagination
    }
    if (options.filter) {
      this.filter = options.filter
    }
    if (options.params) {
      this.params = options.params
    }
  }

  async list (ctx) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.repo.list({
          ctx:ctx,
          pagination: this.pagination,
          filter: this.filter,
        }))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async get () {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.repo.getById({id: this.filter.id}))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async getAll (options={}) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.repo.getAll(options))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async update () {
    return new Promise(async (resolve, reject) => {
      try {
        const model = await this.repo.getById({id: this.filter.id})
        if (model) {
          resolve(await this.repo.update(model, this.params))
        } else {
          reject(new error.BadRequestError('model not found'))
        }
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async create () {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.repo.register(this.params))
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }
}

module.exports = BaseService