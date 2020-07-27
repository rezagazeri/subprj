const { Kafka } = require('kafkajs')
const { getConfig } = require("../config/config")

/**
 * 
 * @param {number} index 
 * @returns {Kafka}
 */
async function createKafkaClient(index = 0) {
    let client = getConfig().kafka.clients[index]
    return new Kafka({clientId: client.clientId, brokers: client.brokers})
}

/**
 * 
 * @type {Array}
 */
let clients = new Array()

/**
 * 
 * @param {number} index
 * @returns {Kafka}
 */
function getKafkaClient(index = 0) {
    return clients[index]
}

/**
 * 
 * @returns {Promise<void>}
 */
async function initKafkaClients() {
    let drivers = getConfig().kafka.clients
    drivers.forEach(element => {
        clients.push(new Kafka({
            clientId: element.clientId,
            brokers: element.brokers
        }))
    })
}

module.exports = {
    createKafkaClient,
    getKafkaClient,
    initKafkaClients
}
