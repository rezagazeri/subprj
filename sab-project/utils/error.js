const {BaseError} = require('../models/error')

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
  constructor (
    key,
    message,
    details,
    userMessages,
  ) {
    super(500, key, message, details, userMessages)
  }
}

/**
 *
 */
class NotImplementedError extends InternalError {

  constructor () {
    super('NOT_IMPLEMENTED', 'Not implemented yet')
  }
}

/**
 *
 */
class NotFoundError extends BaseError {

  constructor () {
    super(404, 'NOT_FOUND', 'Not Found')
  }
}

/**
 *
 */
class UnauthorizedError extends BaseError {

  constructor () {
    super(401, 'UNAUTHORIZED', 'Your identity has not been verified')
  }
}

/**
 *
 */
class InvalidTokenError extends BaseError {

  constructor () {
    super(401, 'INVALID_TOKEN', 'Token is not valid')
  }
}

/**
 *
 */
class ExpiredTokenError extends BaseError {

  constructor () {
    super(401, 'EXPIRED_TOKEN', 'Token has expired')
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
  constructor (
    message,
    details,
    userMessages,
  ) {
    super(409, 'CONFLICT', message, details, userMessages)
  }
}

/**
 * Ali Error
 */
class ToBaseError extends BaseError {

  constructor (error) {
    super(error.code, error.key, error.message, error.details, error.userMessages, error.captchaImage, error.captchaId)
  }
}

/**
 * Ali Error
 */
class AccessDeniedError extends BaseError {

  constructor (message = 'No access allowed', key = 'ACCESS_DENIED') {
    super(403, key, message)
  }
}

/**
 * Ali Error
 */
class InvalidCredentialsError extends BaseError {

  constructor (message = 'incorrect username or password', CaptchaImage, CaptchaId) {
    super(403, 'INVALID_CREDENTIALS', message,new Object(), new Object(), CaptchaImage, CaptchaId)
  }
}

/**
 * Ali Error
 */
class SoapError extends BaseError {

  constructor (message = 'Unable to connect to soap server') {
    super(500, 'SOAP_ERROR', message)
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
  constructor (
    message = 'bad request',
    details = {},
    userMessages = '',
  ) {
    super(400, 'BAD_REQUEST', message, details, userMessages)
  }
}

/**
 * Ali Error
 */
class DatabaseError extends BaseError {

  constructor (message = 'database error') {
    super(500, 'DATABASE_ERROR', message)
  }
}

module.exports = {
  BaseError,
  InternalError,
  NotImplementedError,
  NotFoundError,
  UnauthorizedError,
  InvalidTokenError,
  ExpiredTokenError,
  ConflictError,
  /*
  * Ali Errors
  */
  BadRequestError,
  AccessDeniedError,
  InvalidCredentialsError,
  DatabaseError,
  SoapError,
  ToBaseError,
}
