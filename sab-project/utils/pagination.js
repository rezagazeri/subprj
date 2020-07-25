const express = require("express")

/**
 * 
 */
class Pagination {

    /**
     * 
     * @param {express.Request} req 
     */
    constructor(req) {
        let query = req.query
        this.page = query.page || 1
        this.pageSize = query.pageSize || 1000
        this.order = query.order || "id"
        this.orderType = query.orderType || "DESC"
        this.count = 0
    }

    /**
     * 
     * @returns {Object} 
     */
    getSequelizeOptions() {
        return {
            offset: ((this.page - 1) * this.pageSize) + 1,
            limit: this.pageSize * 1,
            order: [[this.order, this.orderType]]
        }
    }
}

module.exports = {
    Pagination
}
