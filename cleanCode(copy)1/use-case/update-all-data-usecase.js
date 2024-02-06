
function makeupdateAllDataUsecase({ Joi, updateAllDataDataAccess,user }) {
    return async function updateAllDataUsecase({id, newData}) {  
        
        const {userName, accessToken,expiresIn}=newData;
        validation({id,userName, accessToken,expiresIn})
             
        let userEntity=user({id,fname:userName,accessToken,expiresIn})
        // const newData = userEntity.fname
        // if(userName){
        //     newData.fname=userName
        // }
        console.log("in usecase update all data");

         console.log("update all data in usecase call from dataaccess",updateAllDataDataAccess);
         let data= await updateAllDataDataAccess({userId:userEntity.id,newData:userEntity.fname})
         console.log(data,"data of usease");

         const ifexists = await redis.hexists(id,"emailId")

         if(ifexists){
            if(userName){await redis.hset(id,"userName",userName)}else {return null};
            if(expiresIn){await redis.hset(id,"expiresIn",expiresIn)}else {return null};
           if(accessToken){await redis.hset(id,"accessToken",accessToken)}else {return null};
        }

         if (data==0) {
                throw (`${id} user_id does not exists` );
              }
              else if (data == 1) {
                throw ("Users updated");
              }
         return data;
    };
    function validation(input){
        const schema = Joi.object({
            id: Joi.string().required(),
            userName: Joi.string().trim().required().min(3)
        })
        const {error}= schema.validate(input);
       if(error)  throw (error.details[0].message);
    }
    
  }
  module.exports = makeupdateAllDataUsecase;