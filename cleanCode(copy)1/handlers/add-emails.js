

const { Kafka } = require('kafkajs')
const {fetch} = require('node-fetch');
const {getUserByIdUsecase,addLabel}= require('../use-case/index')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'add-folder', fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({message }) => {
      let id = message.value.toString()
      console.log(message.value.toString(),"addemailshandlers");

    //   const userData = await getUserByIdUsecase({id});
    //   console.log(userData.email);
    //  console.log(".................................");
    },
  })
}

run().catch(console.error)