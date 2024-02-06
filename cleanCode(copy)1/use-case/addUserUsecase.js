const { Kafka } = require('kafkajs')
const label = require('../entities/label')

function makeaddUserUsecase({addusertoDataAccess,Joi,userExistUsecase,addLabels,user,addLabelkafka,redis,addUserRedisUsecase}){
    return async function adduserUsecase({fname,emailId,accessToken,refreshToken,expiresIn}){
      
        validation({fname,emailId,accessToken,refreshToken,expiresIn})
        const userEntity = user({fname,emailId,accessToken,refreshToken,expiresIn})

        //   let exist=await userExistUsecase({emailId})
        //   existederror(exist)

        console.log("usecase",fname,emailId,accessToken,refreshToken,expiresIn)
         console.log(userEntity.fname,"userEntity.fname");

        let result = await addusertoDataAccess({fname:userEntity.fname, emailId:userEntity.emailId,accessToken:userEntity.accessToken,refreshToken:userEntity.refreshToken,expiresIn:userEntity.expiresIn});
        console.log(result[0].id);
        //   await addLabels({id:result[0].id});
        let id = result[0].id;

        addUserRedisUsecase({id,fname,emailId,accessToken,refreshToken,expiresIn})
    //    let redisdata= await redis.hset(id,{fname,emailId,accessToken,refreshToken,expiresIn});
    //    console.log(redisdata,"add user redis data in add userusecase");

        // let labels = ["INBOX","STAR","TRASH","SENT","DRAFT"];
        let labels =  {1:"IMPORTANT",2:"INBOX",3:"STARRED",4:"SENT",5:"TRASH"}

         for(let i in labels ){
                let resulttt = await addLabels({id,labelName:labels[i],providersId:"1",})
         }

         await addLabelkafka({id});
             
    // const kafka = new Kafka({
    //     clientId: 'email-folder',
    //     brokers:['localhost:9092']
    // })
    // const producer = kafka.producer()

    // await producer.connect()
    // // console.log(id,"id controller");
    // await producer.send({
    //     topic:'gmail-labels',
    //     messages:[{value:id}],
    // })
          return result;
    }
    
    function validation(input){
        const schema=Joi.object({
            fname :Joi.string().trim().max(15).min(3).required(),
            emailId:Joi.string().email().trim().required(),
            accessToken:Joi.string(),
            refreshToken:Joi.string(),
            expiresIn:Joi.number(),
        });
        const {error}= schema.validate(input);
        if (error) {
            throw error;
        }
    }

    function existederror(input){
        if(input==true){
            throw {
                error: "error",
                message:"User with the same email is already exists"
            }
            
        }
    }
    
}
module.exports=makeaddUserUsecase;