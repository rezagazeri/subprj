/**
 * 
 * @param {string} path 
 * @returns {Object}
 */
async function loadJsonFile(path) {
    return await require(path)
}

module.exports = {
    loadJsonFile
}
