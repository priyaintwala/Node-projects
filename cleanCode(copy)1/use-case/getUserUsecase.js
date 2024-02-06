
function makegetuserUsecase({getUserDataAccess,Joi,getLabelsById}){
    return async function getuserUsecase({offset,limit}){
            validation({offset,limit})
            // try {
                // console.log("hello");
                let [user] =  await getUserDataAccess({offset,limit});
                //[user]
                console.log("user in get user",user,"offest for user",offset);
                   for(let i=0;i<user.length;i++){
                      let id=user[i].id;
                      let labelData=await getLabelsById({id})
                    //   console.log("id for label data",id);
                      user[i].label = labelData;
                   }
                   return user;
            // } catch (error) {
            //     throw (error);
            // }
          
    }
    function validation(input){
        
        const schema=Joi.object({
          
            offset :Joi.number().required().unsafe(),
            limit :Joi.number().required()
        })
        const {error}= schema.validate(input);
       if (error) throw (error);
    }
}
module.exports=makegetuserUsecase;