function makeupdateUserRedisUsecase({redis}){
    return async function updateUserRedisUsecase({id,userName}){
        console.log(`updateUserRedisUsecase uscase called ith data: ${id}`);

         const ifexists = await redis.hexists(id,"emailId")

              if(ifexists){
                userName?await redis.hset(id,"userName",userName):null;
              }
            
    }
}
module.exports= makeupdateUserRedisUsecase