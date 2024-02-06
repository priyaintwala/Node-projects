module.exports= function kafkaAddLabelController({Kafka}){

    return async function run({id}){
        const kafka = new Kafka({
            clientId: 'email-folder',
            brokers:['localhost:9092']
        })
        const producer = kafka.producer()

        await producer.connect()
        // console.log(id,"id controller");
        await producer.send({
            topic:'gmail-labels',
            messages:[{value:id}],
        })
       }
    } 

