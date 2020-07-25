/*
* Get each pending queued transaction and analyze
* Then queue to processed queue
* Cron job run every minutes
* */

const { TransactionService } = require('../modules/behdad/services/TransactionService')
exports.JobRunning = async () => {
  const CronJob = require('cron').CronJob
  new CronJob('0 * * * * *', async () => {
    try {
      const Job = new TransactionService()
      await Job.insertProcessedTransactionsToDb()
    } catch (e) {
      // TODO
      console.log(e)
    }
  }, null, true, 'Asia/Tehran')
}