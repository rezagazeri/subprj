/**
 * @typedef {import("./bank_account").BankAccount} BankAccount
 */

const OilChartStructureType = {
    Headquarter: 1,
    Region: 2,
    Area: 3
}

/**
 * @typedef {Object} OilChartStructure
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} financialCode
 * @property {string} salesCode
 * @property {string} depositId
 * @property {string} publicDepositId
 * @property {number} parentId
 * @property {number} level
 * @property {number} flagId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {number[]} bankAccountIds
 * @property {BankAccount[]} bankAccounts
 */

module.exports = {
    OilChartStructureType
}
