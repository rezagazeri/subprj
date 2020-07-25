class BaseRepository {
  constructor (options) {
    this.model = options.model
  }

  async getById (options) {
    return new Promise(async (resolve, reject) => {
      try {
        let findOptions = {
          where: {id: options.id},
        }
        resolve(await this._findOne(findOptions))
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async update (model, params) {
    return new Promise(async (resolve, reject) => {
      try {
        let options = {fields: []}
        for (let index in params) {
          if (params.hasOwnProperty(index)) {
            model[index] = params[index]
            options.fields.push(index)
          }
        }
        resolve(await this._updateModel(model))
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async register (options) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this._insert(options))
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async list (options) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this._findAndCountAll(options, options.pagination)
        options.pagination.count = Math.ceil(result.count/options.pagination.pageSize)
        resolve({
          items: result.rows,
          pagination: options.pagination,
        })
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async getAll (options) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this._findAll(options))
      } catch (e) {
        // TODO logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async bulkInsert (values,options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.model.bulkCreate(values,options))
      } catch (e) {
        // TODO logging
        console.log(e)
        reject(new error.DatabaseError(e.code))
      }
    })
  }

  async _max (field, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.model.max(field, options))
      } catch (e) {
        // TODO logging
        console.log(e)
        reject(new error.DatabaseError(e.code))
      }
    })
  }

  async _findOne (options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.model.findOne(options))
      } catch (e) {
        // TODO logging
        console.log(e)
        reject(new error.DatabaseError(e.code))
      }
    })
  }

  async _findAll (options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.model.findAll(options))
      } catch (e) {
        // TODO logging
        console.log(e)
        reject(new error.DatabaseError(e.code))
      }
    })
  }

  async _insert (options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.model.create(options))
      } catch (e) {
        // TODO logging
        console.log(e)
        reject(new error.DatabaseError(e.code))
      }
    })
  }

  async _update (set, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.model.update(set, options))
      } catch (e) {
        // TODO logging
        console.log(e)
        reject(new error.DatabaseError(e.code))
      }
    })
  }

  async _updateModel (model, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(model.save(options))
      } catch (e) {
        // TODO logging
        console.log(e)
        reject(new error.DatabaseError(e.code))
      }
    })
  }

  async _findAndCountAll (options = {}, pagination = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!options.limit) {
          options.limit = this.__getLimit(pagination)
        }
        if (!options.offset) {
          options.offset = this.__getOffset(pagination)
        }
        if (!options.order) {
          options.order = this.__getOrder(pagination)
        }
        //delete options.pagination
        resolve(await this.model.findAndCountAll(options))
      } catch (e) {
        // TODO logging
        console.log(e)
        reject(new error.DatabaseError(e.code))
      }
    })
  }

  __getLimit (pagination) {
    return parseInt(pagination.pageSize || constants.pagination.defaults.pageSize)
  }

  __getOffset (pagination) {
    return parseInt(pagination.pageSize || constants.pagination.defaults.pageSize)
      * ((pagination.page || constants.pagination.defaults.page) - 1)
  }

  __getOrder (pagination) {
    return [
      [
        (pagination.order || constants.pagination.defaults.order),
        (pagination.orderType || constants.pagination.defaults.orderType)]]
  }

  _getDateRange (start, end, op) {
    if (start && end) {
      return {[op.between]: [start + '00:00:00', end + '23:59:59']}
    } else if (end) {
      return {[op.lte]: end + '23:59:59'}
    } else {
      return {[op.gte]: start + '00:00:00'}
    }
  }
}

module.exports = BaseRepository