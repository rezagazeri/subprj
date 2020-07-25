/*
* Get all Identifiers from all Central Bank Accounts Number using Behdad webservices
* Cron job run at 1:15:00 AM every day
* */

const JobService = require('../modules/behdad/services/IdentifierService')
exports.JobRunning = () => {
  const CronJob = require('cron').CronJob
  new CronJob('0 15 1 * * *', async () => {
    try {
      const Job = new JobService()
      await Job.getIdentifiers()
    } catch (e) {
      // TODO
      console.log(e)
    }
  }, null, true, 'Asia/Tehran')
}