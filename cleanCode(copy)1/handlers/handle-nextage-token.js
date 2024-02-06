const {Kafka}= require('kafkajs')
// const nodefetch = require('node-fetch')
// const fs = require('fs');

const {consumerUsecase} = require('../use-case/index')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});



module.exports = function makeAddNextpageToken(){
    return async function addNextpageToken(){

        const consumer = kafka.consumer({ groupId: 'new-mail-group' });
        await consumer.connect()
        await consumer.subscribe({ topic: 'handle-pagetoken', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const messageObj = message.value;
                const userid = messageObj.userData.id;
                const label = messageObj.label;
                const nextPageToken = messageObj.pageToken;
                const access_token = messageObj.userData.access_token;
                const userData = messageObj.userData;

                while(nextPageToken!=undefined){
                    const  result =await consumerUsecase({id:userid,labelName:label,pageToken:nextPageToken})
                    nextPageToken = result.nextPageToken;
                }

            }
        });

    }

}