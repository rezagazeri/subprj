const UserLevel = {
    ADMIN: 1,
    HEADQUARTER: 2,
    REGION: 3,
    AREA: 4
}

/**
 * 
 * @typedef {Object} User 
 * @property {number} id 
 * @property {string} fullName 
 * @property {number} genderId 
 * @property {string} email 
 * @property {string} mobile 
 * @property {Date} lastLoginDate 
 * @property {number} loginCount 
 * @property {string} authToken 
 * @property {number} situationId 
 * @property {string} roleName 
 * @property {number} roleLevel 
 * @property {Object} chartStructure
 * @property {number} chartStructure.id 
 * @property {number} chartStructure.level
 * @property {number} chartStructure.parentId
 * @property {Object[]} roles 
 * @property {number} roles.id 
 * @property {string} roles.name 
 * @property {number} roles.levelId 
 * @property {string} roles.levelName 
 * @property {number} roles.chartStructureId 
 * @property {string} roles.chartStructureName 
 * @property {number} roles.chartStructureLevel  
 */

module.exports = {
    UserLevel
}
