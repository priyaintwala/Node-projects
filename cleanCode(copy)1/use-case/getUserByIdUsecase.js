
function makegetUserByIdUsecase({getuserByIdDataAccess,Joi,getLabelsById,redis,getuserByIdRedisUsecase}){
    return async function getuserByIdUsecase({id}){
        console.log(`getuserByIdUsecase uscase called ith data: ${id}`);
            validation({id});
            console.log("validation check for id",{id});
             
            // console.log("idexistedcheck",idExistedUsecase({id}));
            // let exist = await idExistedUsecase({id})
            // // console.log("existed check",exist);
            // existederror(exist)
            
            // const ifexists = await redis.hexists(id,"emailId")

            // if(ifexists){
            //     let data = await redis.hgetall(id);
            //     console.log(data);
            //     return {data};
            // }
            await getuserByIdRedisUsecase({id})

            let userData = await getuserByIdDataAccess({id});
            console.log("usecase userdata",userData);
            let labelData=await getLabelsById({id})
            console.log("usecase labeldata",labelData);

            return {userData,labelData};
            
    }
    function validation(input){
        const schema=Joi.object({
            id :Joi.string().required(),
        })
        const {error}= schema.validate(input);
       if (error) throw (error.details[0].message);
    }
    
    function existederror(input){
        if(input==false){
            throw ("id not existed");
        }
    }
}

module.exports=makegetUserByIdUsecase