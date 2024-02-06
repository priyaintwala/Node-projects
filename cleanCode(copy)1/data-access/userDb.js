const mysql = require("mysql2");
const config = require('../config/development')
const {Pool} = require('pg');
const { access } = require("nyc/lib/fs-promises");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mahi*0106" , 
    database: "email_database",
}).promise();

const cockroach = new Pool({ 
    user: config.development.username, 
    host: config.development.host, 
    database: config.development.database, 
    password: config.development.password, 
    port: config.development.port, 
    ssl: config.development.dialectOptions.ssl
});

// async function getUserDataAccess({offset,limit}){
//        let users = await connection.query(`SELECT * FROM Users LIMIT ?,?`,[+offset,+limit ]);  
//        return users;
// }

async function getUserDataAccess({offset,limit}){
    let users = await cockroach.query(`SELECT * FROM users LIMIT $1,$2`,[+offset,+limit]);  
    return users.rows;
}

//  async function addusertoDataAccess({
//   fname,
//   emailId,
// }){
//     let [result]=  await  connection.query("INSERT INTO Users(userName,emailId) VALUES (?,?)",[fname,emailId]);
//      // console.log(result);
//       return result.insertId;
// }

async function addusertoDataAccess({
    fname,
    emailId,
    accessToken,
    refreshToken,
    expiresIn
  }){
      let result=  await  cockroach.query("INSERT INTO users(username,email_id,access_token,refresh_token,expires_in) VALUES ($1,$2,$3,$4,$5) Returning id",[fname,emailId,accessToken,refreshToken,expiresIn]);
       // console.log(result);
        return result.rows;
  }

// async function getuserByIdDataAccess({id}){
//       console.log("dataaccse user",{id});
//        let [user]= await connection.query("SELECT * FROM Users WHERE id=(?)",[id])
//        console.log("dataacess userrr",user);
//        return user;
// }

async function getuserByIdDataAccess({id}){
    console.log("dataaccse user",{id});
     let user= await cockroach.query("SELECT * FROM users WHERE id=$1",[id])
    //  [user]
     console.log("dataacess userrr",user.rows[0]);
     return user.rows[0];
}

// async function deleteuserByIdDataAccess({id}){
//      let user= await connection.query("DELETE FROM Users WHERE id=?",[id])
//      return user;
// }

async function deleteuserByIdDataAccess({id}){
    let user= await cockroach.query("DELETE FROM users WHERE id=$1",[id])
    return user;
}

// async function updateuserDataAccess({id,userName}){
//         let user =await connection.query("UPDATE Users SET userName=? WHERE id =?",[userName,id]);
//         return user;
// }

async function updateuserDataAccess({id,userName}){
    console.log("dataaccesss");
    let user =await cockroach.query("UPDATE users SET username=$1 WHERE id =$2",[userName,id]);
    console.log("userrrrrrr",user);
    return user;
}

// async function userExistDataAccess({emailId}){
//       let user = await connection.query("SELECT * FROM Users WHERE emailId=?",[emailId]);
//       return user;
// }

async function userExistDataAccess({emailId}){
    let user = await cockroach.query("SELECT * FROM users WHERE email_id=$1",[emailId]);
    return user;
}

async function getUserfromExpiresDataAccess({currentTime}){
    console.log("dataaccess in user",currentTime);
    let user = await cockroach.query("SELECT * FROM users WHERE expires_in<$1",[currentTime]);
    console.log(user.rows,"user.rows in daaaccess of useer");
    return user.rows;
}

async function updateAllDataDataAccess({userId, newData}) {
    let result = await cockroach.query(`UPDATE users SET ("${Object.keys(newData).join('","')}") = ('${Object.values(newData).join("','")}') WHERE id =$1` , [userId]);
    return result.rowCount;
  }

module.exports={
    getUserDataAccess,
    addusertoDataAccess,
    getuserByIdDataAccess,
    deleteuserByIdDataAccess,
    updateuserDataAccess,
    userExistDataAccess,
    getUserfromExpiresDataAccess,
    updateAllDataDataAccess,
}
