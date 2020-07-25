const BaseService = require('../../../services/BaseService')
const AccountService = require('./AccountService')
const AccountNumberService = require('./AccountNumberService')
const RedisListService = require('./RedisListService')
const BehdadService = require('./BehdadService')
const CustomerService = require('./CustomerService')
const moment = require('moment-jalaali')

class TransactionService extends BaseService {

  constructor (options = {}) {
    options.repo = require('../repository/TransactionRepository')
    super(options)
  }

  // TODO
  async getTransactionEndDate (behdadAccount) {
    return new Promise(async (resolve, reject) => {
      let now = new Date()
      const account = new AccountService()
      await account.setLastUpdate(behdadAccount, now)
      resolve(now)
    })
  }

  async insertProcessedTransactionsToDb () {
    return new Promise(async (resolve, reject) => {
      try {
        const processedRedisList = new RedisListService({ name: constants.behdad.transaction.redis.list.processed })
        const transactions = await processedRedisList.getAll()
        const packedTransactions = this.packTransaction(transactions)
        resolve(await this.insertToDb(packedTransactions))
      } catch (e) {
        reject(e)
      }
    })
  }

  packTransaction (transactions) {
    let array = []
    let index = 0
    array[index] = []
    let i = 0
    transactions.map(transaction => {
      if (i === constants.behdad.transaction.maxTransactionToInsert) {
        i = 0
        index++
        array[index] = []
      }
      array[index].push(transaction)
      i++
    })
    return array
  }

  async insertToDb (packedTransactions) {
    let promises = []
    packedTransactions.map(async pack => {
      promises.push(new Promise(async (resolve, reject) => {
        try {
          resolve(await this.repo.bulkInsert(pack))
        } catch (e) {
          reject(e)
        }
      }))
    })
    return Promise.all(promises)
  }
}

class BehdadTransactions extends TransactionService {

  constructor (options = {}) {
    super(options)
  }

  async getTransactions () {
    return new Promise(async (resolve, reject) => {
      try {
        const AccountNumber = new AccountNumberService()
        const redisList = new RedisListService({ name: constants.behdad.transaction.redis.list.pending })
        this.accountNumbers = await AccountNumber.getAll()
        this.accountNumbers.map(async accountNumber => {
          const behdad = new BehdadService({
            username: accountNumber.account.username,
            password: accountNumber.account.password,
          })
          let endDate = await this.getTransactionEndDate(accountNumber.behdadAccount)
          let startDate = new Date(accountNumber.behdadAccount.lastUsedAt || constants.behdad.identifier.startDate)
          await this.getFromBehdad({
            page: 1,
            behdad,
            accountNumber,
            lastLength: constants.behdad.transaction.pageSize,
            redisList: redisList,
            startDate,
            endDate
          })
        })
        resolve()
      } catch (e) {
        // TODO Logging
        reject(new error.ToBaseError(e))
      }
    })
  }

  async getFromBehdad (options) {
    return new Promise(async (resolve, reject) => {
      try {
        if (options.lastLength < constants.behdad.transaction.pageSize) {
          resolve()
        } else {
          const transactions = await options.behdad.getTransactions(
            options.accountNumber.accountNumber,
            options.startDate,
            options.endDate,
            options.page,
            constants.behdad.transaction.pageSize)
          await this.insertToPendingList(transactions, options.accountNumber, options.redisList)
          options.page++
          options.lastLength = transactions.currentPageData.length
          await this.getFromBehdad(options)
          resolve()
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  async insertToPendingList (transactions, behdadAccountNumberModel, redisList) {
    return new Promise(async (resolve, reject) => {
      try {
        transactions.currentPageData.map(async transaction => {
          redisList.queue(JSON.stringify({ transaction, behdadAccountNumber: behdadAccountNumberModel }))
        })
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }
}

class QueuedTransactions extends TransactionService {

  constructor (options = {}) {
    super(options)
  }

  async getTransactions () {
    return new Promise(async (resolve, reject) => {
      try {
        const pendingRedisList = new RedisListService({ name: constants.behdad.transaction.redis.list.pending })
        const processedRedisList = new RedisListService({ name: constants.behdad.transaction.redis.list.processed })
        const transaction = await pendingRedisList.getFromQueue()
        const newTransaction = await this.processTransaction(JSON.parse(transaction))
        await this.insertToProcessedList(newTransaction, processedRedisList)
        resolve(await this.getTransactions())
      } catch (e) {
        reject(e)
      }
    })
  }

  // TODO
  async processTransaction (transaction) {
    return new Promise(async (resolve, reject) => {
      try {
        const ProcessTransaction = new ProcessTransaction(transaction)
        resolve(await ProcessTransaction.execute())
      } catch (e) {
        reject(e)
      }
    })
  }

  async insertToProcessedList (transaction, redisList) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(redisList.queue(JSON.stringify(transaction)))
      } catch (e) {
        reject(e)
      }
    })
  }
}

class ProcessTransaction extends TransactionService {
  constructor (transaction) {
    super({})
    this.raw = transaction
  }

  // TODO job section
  async execute () {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.isJob) {
          await this.processJob()
        } else {
          await this.checkIsValidTransaction()
        }
        resolve(this.transaction.processed)
      } catch (e) {
        reject(e)
      }
    })
  }

  // TODO real condition
  get isJob () {
    return (this.raw.transaction.transactionMediaType === constants.behdad.transaction.media.SYS.key)
  }

  // TODO
  async processJob () {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.generateProcessedTransaction())
      } catch (e) {
        reject(e)
      }
    })
  }

  async checkIsValidTransaction () {
    return new Promise(async (resolve, reject) => {
      try {
        const Customer = new CustomerService()
        let customer = Customer.checkCustomerIdentifierWithBehdadIdentifier(this.raw.transaction.transactionIdentifier)
        let isValid = false
        customer.allowedBankAccounts.map(allowedBankAccount => {
          if (allowedBankAccount.bankAccountId === this.raw.behdadAccountNumber.bankAccountId) {
            isValid = true
          }
        })
        this.isValid = isValid
        this.customer = customer
        resolve(await this.generateProcessedTransaction())
      } catch (e) {
        reject(e)
      }
    })
  }

  static getDate (jdate, jtime) {
    return moment(jdate + ' ' + jtime, 'jYYYYjMMjDD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
  }

  async generateProcessedTransaction () {
    return new Promise(async (resolve, reject) => {
      try {
        const config = constants.behdad.transaction
        this.transaction.processed = {
          sourceId: config.source.behdad,
          bankAccountId: this.raw.behdadAccountNumber.bankAccountId,
          sourceTransactionId: this.raw.transaction.transactionId,
          amount: this.raw.transaction.amount,
          transactionMethodId: config.method[this.raw.transaction.transactionMethod].value,
          newBalance: this.raw.transaction.balance,
          transactionTypeId: config.type[this.raw.transaction.transactionType].value.id,
          sourceCreatedAt: this.getDate(this.raw.transaction.transactionDate, this.raw.transaction.transactionTime),
          identifier: this.raw.transaction.transactionIdentifier,
          customerId: this.customer ? this.customer.id : null,
          sourceAccountNumbers: this.raw.transaction.sourceAccountNumber,
          destinationAccountNumbers: this.raw.transaction.destinationAccountNumber,
          transactionSituationId: config.situation[this.raw.transaction.transactionStatusType].value,
          lastChangeStatusDate: this.getDate(this.raw.transaction.transactionStatusDate, this.raw.transaction.transactionStatusTime),
          transactionMediaTypeId: config.media[this.raw.transaction.transactionMediaType].value,
          isGroupTransfer: (this.raw.transaction.groupTransfer === 'true' || this.raw.transaction.groupTransfer === true),
          description: this.raw.transaction.description,
          isValid: this.isValid,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        resolve(this.transaction.processed)
      } catch (e) {
        reject(e)
      }
    })
  }
}

module.exports = {
  TransactionService,
  BehdadTransactions,
  QueuedTransactions,
}