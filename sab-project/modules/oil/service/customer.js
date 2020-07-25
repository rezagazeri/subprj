const { Context } = require("../../../context/context")
const { BaseService } = require("../../../utils/base_service")

class CustomerService extends BaseService {

    /**
     * 
     * @param {Context} ctx 
     */
    constructor(ctx) {
        super(ctx)
    }
    
    /**
     * 
     * @param {Options} options 
     * @param {User} user
     * @returns {Promise<{items:Customer[],pagination:Pagination}>}
     */
    getList(options, user) {}

    /**
     * 
     * @param {number} customerId 
     * @param {User} user
     * @returns {Promise<Customer>}
     */
    get(customerId, user) {}

    /**
     * 
     * @param {Customer} customer 
     * @param {User} user
     * @returns {Promise<OilChartStructure>}
     */
    add(customer, user) {}

    /**
     * 
     * @param {Customer} customer 
     * @param {User} user
     * @returns {Promise<OilChartStructure>}
     */
    edit(customer, user) {}

    /**
     * 
     * @param {number} customerId 
     * @param {User} user
     * @returns {Promise<void>}
     */
    drop(customerId, user) {}
}

module.exports = {
    CustomerService
}
