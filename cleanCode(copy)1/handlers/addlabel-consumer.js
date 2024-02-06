
const {addLabel,getUserByIdUsecase}=require('../use-case/index')
const { Kafka } = require('kafkajs')
const nodefetch = require('node-fetch')


const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'gmail-labels', fromBeginning: true })
  
  await consumer.run({
    eachMessage: async ({message }) => {
      let id=message.value.toString();
      console.log(message.value.toString());
      const userdetails =  await getUserByIdUsecase({id})
      // console.log(userdetails.userData,"userdetails in handler");
      let labels = `https://gmail.googleapis.com/gmail/v1/users/${userdetails.userData.email_id}/labels?access_token=${userdetails.userData.access_token}`

      const resultLabel = await nodefetch(labels)
      console.log(resultLabel);

      const label = await resultLabel.json()
      // console.log(label,"label in addlabelconsumer");
      // for (let index = 0; index < label.labels.length; index++) {
      //   console.log(labels.id,"forloop id proder");
      //    console.log(label.labels[index].name,"forloop name");
      //    await addLabel({id:message.value.toString(),labelName:label.labels[index].name,providersId:label.id})
     
      for(const i of label["labels"]){
        // console.log(i);
        await addLabel({id,labelName:i.name,providersId:i.id})
        
        }

      // let labels = ["INBOX","STAR","TRASH","SENT","DRAFT"];
      // // console.log({partition,offset: message.offset,value: message.value.toString(),})
      // let id = message.value.toString();
      // console.log(labels,"asdfg");
      // labels.forEach(ele=>{
      //   console.log(ele);
      //     addLabel({id,labelName:ele})
      // })
      const producer = kafka.producer();
      await producer.connect();
      console.log("producer")
      await producer.send({
          topic: "gmail-mails",
          messages: [{ value: JSON.stringify({id,labelName:"IMPORTANT",pageToken:""}) }],
      })
      console.log("sendingg to consmer from producerrrr");
    },
  })
}

run().catch(console.error)