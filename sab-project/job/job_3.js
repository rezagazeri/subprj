/*
* Get all transactions from all Central Bank Accounts Number using Behdad webservices
* And queue transactions to pending queue for analyzing
* Cron job run every 30 minutes
* */

const { BehdadTransactions } = require('../modules/behdad/services/TransactionService')
exports.JobRunning = () => {
  const CronJob = require('cron').CronJob
  new CronJob('* */30 * * * *', async () => {
    try {
      const Job = new BehdadTransactions()
      await Job.getTransactions()
    } catch (e) {
      // TODO
      console.log(e)
    }
  }, null, true, 'Asia/Tehran')
}