function makeUpdateUserUsecase({updateuserDataAccess,Joi,user,redis,updateUserRedisUsecase}){
    return async function updateUserUsecase({id,userName}){
         
             validation({id,userName})
             
             let userEntity=user({id,fname:userName})
             console.log("in usecase update");
            //  let exist = await idExistedUsecase({id})
            //  existederror(exist)
            // console.log(userEntity.id,"userenitty.id and fname");
              console.log("aaaaaaaaa",updateuserDataAccess);
              let data= await updateuserDataAccess({id:userEntity.id,userName:userEntity.fname})
              console.log(data,"data of usease");
              
              await updateUserRedisUsecase({id,userName})
            //   const ifexists = await redis.hexists(id,"emailId")

            //   if(ifexists){
            //     userName?await redis.hset(id,"userName",userName):null;
            //   }
        
              return data;
        }
        
        function validation(input){
            const schema = Joi.object({
                id: Joi.string().required(),
                userName: Joi.string().trim().required().min(3)
            })
            const {error}= schema.validate(input);
           if(error)  throw (error.details[0].message);
        }
        function existederror(input){
            if(input==false){
                throw ("id not existed");
            }
        }
}

module.exports=makeUpdateUserUsecase;