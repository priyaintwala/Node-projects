// const { CronJob } = require("cron");

// let coumt =0;
// const job = new CronJob('* * * * * *', async function () {
    
//     function twoMinutes(){
//            for(let i=0;i<100000;i++){
//             console.log(i);
//            }
//            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
//     }
//     twoMinutes()
//     console.log("Every four second:",coumt);
//     coumt++;

//   });
//   console.log("After job instantiation");

// job.start();

// const cron = require('node-cron');

// cron.schedule('* * * * * *',async ()=>{
//        console.log();
// }


const redis = require('redis');

// Create a Redis client
const client = redis.createClient();


client.on('connect',()=>{
    console.log("Client connected");
})

client.on('redis',()=>{
    console.log("Client connected to redis and ready to use");
})

client.on('error',(err)=>{
    console.log(err.message);
})

client.on('end',()=>{
    console.log("Client disconnect from redis");
})

process.on('SIGINT',()=>{
    client.quit()
})

module.exports=client;
// Key to retrieve
// const key = 'myKey';

// // Fetch data from Redis
// client.get(key, (error, result) => {
//   if (error) {
//     console.error('Error:', error);
//     // Handle error
//   } else {
//     console.log('Result:', result);
//     // Process the retrieved data
//   }

//   // Close the Redis connection
//   client.quit();
// });

