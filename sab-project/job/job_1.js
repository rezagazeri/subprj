/*
* Get all Central Bank Accounts Number from all Behdad credentials using Behdad webservices
* Cron job run at 1:00:00 AM every day
* */

const JobService = require('../modules/behdad/services/AccountNumberService')
exports.JobRunning = () => {
  const CronJob = require('cron').CronJob
  new CronJob('0 0 1 * * *', async () => {
    try {
      const Job = new JobService()
      await Job.getAccountNumbers()
    }catch (e) {
      // TODO
      console.log(e)
    }
  }, null, true, 'Asia/Tehran')
}