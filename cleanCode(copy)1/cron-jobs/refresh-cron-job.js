function CronJobs({ CronJob,cronJobUsecase}) {
   
  
    const job = new CronJob('* * * * * *', async function () {
      // const job = new CronJob('*/5 * * * *', async function () {
      await cronJobUsecase();
      console.log("Every second:");
    });
    console.log("After job instantiation");
  
    job.start();
  }
  module.exports = CronJobs;