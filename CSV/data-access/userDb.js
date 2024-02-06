function makegetUser({connection}){
    return async function getUserByIdDataAccess({id}){
        try {
            console.log(id,"indataacces");
            const result = await connection.query(`SELECT * FROM users WHERE id=?`,[id]);
            // console.log(result,"result");
            return result[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    
    }
}
module.exports=makegetUser