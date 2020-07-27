const { BaseError, InternalError, NotImplementedError, UnauthorizedError, InvalidTokenError,
    ExpiredTokenError, AccessDeniedError, BadRequestError, ConflictError } = require("./src/error/error")
const { toBaseError } = require("./src/error/utils")
const { loadJsonFile } = require("./src/util/json")
const { LimitedParallels } = require("./src/util/limited_parallels")
const { BaseRepository } = require("./src/util/sequelize/base_repository")
const { asyncWrapper } = require("./src/util/express/wrapper")
const { errorMiddleware } = require("./src/util/express/error_middleware")
const { logMiddleware } = require("./src/util/express/log_middleware")
const { initConfig, getConfig } = require("./src/config/config")
const { LogLevel, Log } = require("./src/log/log")
const { initLogger, getLogger } = require("./src/log/logger")
const { initRedisClients, getRedisClient } = require("./src/client/redis")
const { initKafkaClients, getKafkaClient } = require("./src/client/kafka")
const { initMongoClients, getMongoClient } = require("./src/client/mongo")
const { initMongoosClients, getMongoosClient } = require("./src/client/mongoose")
const { initSequelizeClients, getSequelizeClient } = require("./src/client/sequelize")

module.exports = {
    BaseError, InternalError, NotImplementedError, UnauthorizedError, InvalidTokenError,
    ExpiredTokenError, AccessDeniedError, BadRequestError, ConflictError,
    toBaseError, loadJsonFile, LimitedParallels,
    BaseRepository, asyncWrapper, errorMiddleware, logMiddleware,
    initConfig, getConfig,
    LogLevel, Log,
    initLogger, getLogger,
    initRedisClients, getRedisClient,
    initKafkaClients, getKafkaClient,
    initMongoClients, getMongoClient,
    initMongoosClients, getMongoosClient,
    initSequelizeClients, getSequelizeClient,
}
