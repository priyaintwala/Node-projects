const {Kafka}= require('kafkajs')
// const nodefetch = require('node-fetch')
// const fs = require('fs');

const {consumerUsecase} = require('../use-case/index')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'new-mail-group' });
const run = async () =>{
    
await consumer.connect()
await consumer.subscribe({ topic: 'gmail-mails', fromBeginning: true });

await consumer.run({
    eachMessage: async ({topic,partition,message})=>{
        try {
           let {id,labelName,pageToken} = JSON.parse(message.value.toString()); 
           const result = await consumerUsecase({id,labelName,pageToken});
           console.log("resulr of page token in handler ", result);
           if (result.pageToken != undefined){
            await producer.connect()
            await producer.send({
                topic: 'handle-pagetoken',
                messages: [
                    { value: JSON.stringify({ label: result.label, pageToken:result.pageToken, userData:result.userData }) },
                ],
            });
           } 
        } catch (error) {
            console.log(error,"error in handler")
        }
    }
})
}
run(consumer).catch(console.error)

