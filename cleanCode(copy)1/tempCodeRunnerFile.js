var CronJo = require('cron').CronJob;
var job = new CronJo(
    '5 * * * * *',
    function(){
        const d = new Date();
        console.log('at every second',d);
    });
job.start();