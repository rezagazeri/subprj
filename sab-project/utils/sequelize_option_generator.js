const express = require("express")
const moment = require("moment")
const { Op } = require('sequelize')
const { Pagination } = require("./pagination")

/**
 * 
 */
class SequelizeOptionGenerator {

    /**
     * 
     * @param {express.Request} req 
     */
    constructor(req) {
        this.req = req
        this.__assignConditions()
    }

    /**
     * 
     */
    __assignConditions() {
        this.where = {}
        let createdFrom = this.req.query.createdFrom
        let createdTo = this.req.query.createdTo
        if (createdFrom != null || createdTo != null) {
            this.where.createdAt = {}
            if (createdFrom != null) {
                this.where.createdAt[Op.gte] = moment.unix(Math.floor(createdFrom/1000)).toDate()
            }
            if (createdTo != null) {
                this.where.createdAt[Op.lte] = moment.unix(Math.floor(createdTo/1000)).toDate()
            }
        }
        let timeFrom = this.req.query.timeFrom
        let timeTo = this.req.query.timeTo
        if (timeFrom != null || timeTo != null) {
            this.where.lastChangeStatusDate = {}
            if (timeFrom != null) {
                this.where.lastChangeStatusDate[Op.gte] = moment.unix(Math.floor(timeFrom/1000)).toDate()
            }
            if (timeTo != null) {
                this.where.lastChangeStatusDate[Op.lte] = moment.unix(Math.floor(timeTo/1000)).toDate()
            }
        }
    }

    /**
     * 
     * @param {string} field 
     * @param {any} value 
     */
    addEqual(field, value) {
        if (value == null || value == undefined || ((typeof value) == "string" && value == "")
            || value == "\"\"" || value == "null") {
            return
        }
        if (this.where[field] == undefined) {
            this.where[field] = {}
        }
        this.where[field][Op.eq] = value
        // this.where[field] = value
    }

    /**
     * 
     * @param {string} field 
     * @param {any} value 
     */
    addNotEqual(field, value) {
        if (value == null || value == undefined || ((typeof value) == "string" && value == "")
            || value == "\"\"" || value == "null") {
            return
        }
        if (this.where[field] == undefined) {
            this.where[field] = {}
        }
        this.where[field][Op.ne] = value
        // this.where[field] = value
    }

    /**
     * 
     * @param {string[]} fields 
     */
    addLikes(fields) {
        if (!this.where) {
            this.where = {}
        }
        for (let i = 0; i < fields.length; i++) {
            let field = fields[0]
            let value = this.req.query[field]
            if (value != undefined && value != null && value != "" && value !="null") {
                if (this.where[field] == undefined) {
                    this.where[field] = {}
                }
                this.where[field][Op.like] = `%${value}%`
            }
        }
    }

    /**
     * 
     * @returns {Object}
     */
    generate() {
        return {
            where: this.where
        }
    }

    /**
     * @returns {{options: Object, pagination: Pagination}}
     */
    generateWithPagination() {
        let pagination = new Pagination(this.req)
        this.__handlePagination(pagination)
        return {
            pagination,
            options: {
                offset: this.offset,
                limit: this.limit,
                order: this.order,
                where: this.where
            }
        }
    }

    /**
     * 
     * @param {Pagination} pagination 
     */
    __handlePagination(pagination) {
        if (pagination.page < 1) {
            pagination.page = 1
        }
        if (pagination.pageSize < 1) {
            pagination.pageSize = 1
        }
        if (pagination.pageSize > 1000) {
            pagination.pageSize = 1000
        }
        this.offset = ((pagination.page - 1) * pagination.pageSize)
        this.limit = parseInt(pagination.pageSize)
        this.order = [[pagination.order, pagination.orderType]]
    }
}

module.exports = {
    SequelizeOptionGenerator
}
