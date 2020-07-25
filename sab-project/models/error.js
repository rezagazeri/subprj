/**
 * 
 */
class BaseError extends Error {

    /**
     *
     * @param {number} code
     * @param {string} key
     * @param {string} message
     * @param {Object} details
     * @param {Object} userMessages
     * @param {string} captchaImage
     * @param {string} captchaId
     */
    constructor(
        code,
        key,
        message,
        details,
        userMessages = new Object(),
        captchaImage = "" ,
        captchaId= ""
    ) {
        super()
        this.code = code
        this.key = key
        this.message = message
        this.details = details
        this.userMessages = userMessages
        this.captchaImage = captchaImage
        this.captchaId = captchaId
    }

    /**
     * 
     * @param {string} lang 
     * @param {string} message 
     */
    addUserMessage(lang, message) {
        this.userMessages[lang] = message
    }
}

/**
 * 
 */
class InternalError extends BaseError {

    /**
     * 
     * @param {string} key 
     * @param {string} message 
     * @param {Object} details 
     * @param {Object} userMessages 
     */
    constructor(
        key,
        message,
        details,
        userMessages
    ) {
        super(500, key, message, details, userMessages, "", "")
    }
}

/**
 * 
 */
class NotImplementedError extends InternalError {

    constructor() {
        super("NOT_IMPLEMENTED", "Not implemented yet")
    }
}

/**
 * 
 */
class NotFoundError extends BaseError {

    constructor() {
        super(404, "NOT_FOUND", "Not Found")
    }
}

/**
 * 
 */
class BadRequestError extends BaseError {

    /**
     * 
     * @param {string} message 
     * @param {Object} details 
     * @param {string} userMessages 
     */
    constructor(
        message,
        details,
        userMessages
    ) {
        super(400, "BAD_REQUEST", message, details, userMessages)
    }
}

/**
 * 
 */
class UnauthorizedError extends BaseError {

    constructor() {
        super(401, "UNAUTHORIZED", "Your identity has not been verified")
    }
}

/**
 * 
 */
class InvalidTokenError extends BaseError {

    constructor() {
        super(401, "INVALID_TOKEN", "Token is not valid")
    }
}

/**
 * 
 */
class ExpiredTokenError extends BaseError {

    constructor() {
        super(401, "EXPIRED_TOKEN", "Token has expired")
    }
}

/**
 * 
 */
class AccessDeniedError extends BaseError {

    constructor(message = "No access allowed") {
        super(403, "ACCESS_DENIED", message)
    }
}

/**
 * 
 */
class ConflictError extends BaseError {

    /**
     * 
     * @param {string} message 
     * @param {Object} details 
     * @param {string} userMessages 
     */
    constructor(
        message,
        details,
        userMessages
    ) {
        super(409, "CONFLICT", message, details, userMessages)
    }
}

module.exports = {
    BaseError,
    InternalError,
    NotImplementedError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
    InvalidTokenError,
    ExpiredTokenError,
    AccessDeniedError,
    ConflictError
}
