function makeaddUserRedisUsecase({redis}){
    return async function addUserRedisUsecase({id,fname,emailId,accessToken,refreshToken,expiresIn}){
        console.log(`addUserRedisUsecase uscase called ith data: ${id}`);

        let redisdata= await redis.hset(id,{fname,emailId,accessToken,refreshToken,expiresIn});
        console.log(redisdata,"add user redis data in add userusecase");
 
    }
}
module.exports= makeaddUserRedisUsecase