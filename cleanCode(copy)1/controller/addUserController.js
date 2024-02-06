
function makeaddUserController({Joi,addUserUsecase,kafkaAddLabelController}){
    return async function addUserController(req,res){
        try {
            // const kafka = new Kafka({
            //     clientId: 'email-folder',
            //     brokers:['localhost:9092']
            // })
            // const producer = kafka.producer()
            
          console.log(req.body);
          validateInput(req.body);
          console.log(req.body,'sdfghjk');
          const {fname,emailId,accessToken,refreshToken,expiresIn} = req.body ;
          
          let result= await addUserUsecase({fname , emailId,accessToken,refreshToken,expiresIn}) ; 
          await kafkaAddLabelController({id:result[0].id})
          
        //    const run = async () => {
        //     await producer.connect()
        //     console.log(result[0].id,"id controller");
        //     await producer.send({
        //         topic:'add-folder',
        //         messages:[{value:result[0].id}],
        //     })
        //    }
        //    run().catch(console.error)
        console.log('.....................................................');
        console.log(result[0].id);

           res.status(201).json({
                status : 'success ',
                msg : 'user created',
                id:result[0].id,
            })
        } catch (error) {
            console.log(error,"in add user-=-=-=-=-=");
            res.status(400).send(error.message);
        }
    }
    function validateInput(input){
        console.log("valid");
        const schema= Joi.object({
            fname :Joi.string().trim().required().max(15).min(3),
            emailId : Joi.string().email().trim().required(),
            accessToken:Joi.string(),
            refreshToken:Joi.string(),
            expiresIn:Joi.number(),
        });

        const {error}= schema.validate(input);
        if (error) throw error;
    }
}

module.exports = makeaddUserController
