const mysql = require("mysql2");
const config = require('../config/development')
const {Pool} = require('pg')

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

// async function addLabels({id}){
//     let folders = ["INBOX","STAR","TRASH","SENT","DRAFT"];
//     for(let i=0;i<folders.length;i++){
//        await  connection.query("INSERT INTO Labels (userId,labelName,SyncedFolderId) VALUES (?,?,?)",[id,folders[i],1]);
//     }
//     console.log("after query");
// }

async function addLabels({id,labelName,providersId,priority}){
    // let folders = ["INBOX","STAR","TRASH","SENT","DRAFT"];
    // for(let i=0;i<folders.length;i++){
       await cockroach.query("INSERT INTO labels (user_id,label_name,synced_folder_id,priority) VALUES ($1,$2,$3,$4) returning id",[id,labelName,providersId,priority]);
    // }
    // console.log("after query");
}

// async function deleteLabels({labelName,userId}){
//     let user= await connection.query("DELETE FROM Labels WHERE labelName=? AND userId=?",[labelName,userId])
//     return user;
// }

async function deleteLabels({labelName,userId}){
    let user= await cockroach.query("DELETE FROM labels WHERE label_name=$1 AND user_id=$2",[labelName,userId])
    return user;
}

// async function getLabelsById({id}){
//      console.log("labels dataccsess",{id});
//        let user= await connection.query("SELECT * FROM Labels WHERE userId=?",[id])
//        console.log("label",user[0]);
//        return user[0];
// }

async function getLabelsById({id}){
      console.log("labels dataccsess",{id});
      let user= await cockroach.query("SELECT * FROM labels WHERE user_id=$1",[id])
      console.log("label",user.rows);
      return user.rows;
}

// async function updateLabels({userId,labelName}){
//     let labeluser= await connection.query("UPDATE Labels SET labelName=? WHERE id=? ",[labelName,userId]);
//     return labeluser
// }

async function updateLabels({userId,labelName}){
    let labeluser= await cockroach.query("UPDATE labels SET label_name=$1 WHERE id=$2 ",[labelName,userId]);
    return labeluser
}

async function updateProvidersId({id,labelName,providersId}){
    let userlabel = await cockroach.query("UPDATE labels SET synced_folder_id=$1 WHERE user_id=$2 AND label_name=$3",[providersId,id,labelName])
    return userlabel.rowCount;
}

async function updateLabelData({userId,updateData,label}){
    console.log(userId,"usrId in usecase");
    console.log(updateData,"update data in dataaccses");
    console.log(label,"label in data acc");
    let result = await cockroach.query(`UPDATE labels SET ("${Object.keys(updateData).join('","')}")=("${Object.values(updateData).join("','")}") WHERE user_id = $1 AND label_name=$2`,[userId,label])
    return result.rowCount;
}

async function getPriorityLabel({userId}){
    console.log("get query for ge priority label in label dataaaccess",userId);
    let result = await cockroach.query(`SELECT "label_name" FROM labels WHERE user_id=$1 AND priority=(SELECT MIN(priority) FROM labels WHERE fetch_status=false AND user_id=$2)`,[userId,userId]);
    return result.rows;
}

async function getLabelId({userId,label}){
    console.log("get query userId",userId);
    let result= await cockroach.query(`SELECT id FROM labels WHERE user_id=$1 AND label_name=$2`,[userId,label]);
    console.log("result of getlabelId",result);
    return result.rows;
}

module.exports={addLabels,getLabelsById,deleteLabels,updateLabels,updateProvidersId,updateLabelData,getPriorityLabel,getLabelId}

