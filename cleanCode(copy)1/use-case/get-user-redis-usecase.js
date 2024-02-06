
function makegetUserByIdRedisUsecase({redis}){
    return async function getuserByIdRedisUsecase({id}){
        console.log(`getuserByIdRedisUsecase uscase called ith data: ${id}`);

            const ifexists = await redis.hexists(id,"emailId")

            if(ifexists){
                let data = await redis.hgetall(id);
                console.log(data);
                return {data};
            }
            
    }
}

module.exports=makegetUserByIdRedisUsecase