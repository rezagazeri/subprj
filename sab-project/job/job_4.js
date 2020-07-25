/*
* Get each pending queued transaction and analyze
* Then queue to processed queue
* */

const { QueuedTransactions } = require('../modules/behdad/services/TransactionService')
exports.JobRunning = async () => {
  try {
    const Job = new QueuedTransactions()
    await Job.getTransactions()
  } catch (e) {
    // TODO
    console.log(e)
  }
}