const nodefetch = require('node-fetch');

function cronJobUsecase({ Joi ,updateAllDataUsecase,getUserfromExpiresDataAccess}) {
    return async function () {
    
    try {

        let currentTime = Date.now(); 
        let result = await getUserfromExpiresDataAccess({ currentTime });

        for(let i of result){
          console.log(i,"i in result");
        let refreshToken =await nodefetch(`https://oauth2.googleapis.com/token?refresh_token=${i.refresh_token}&redirect_uri=http://127.0.0.1:5501/profile.html&client_id=100947048399-9fsvaf4u3lg5j7c0hnrbs5rl7496vqo4.apps.googleusercontent.com&client_secret=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&scope=&grant_type=refresh_token`,{ method: "POST" }); 
        refreshToken=await refreshToken.json();
       
        console.log("data in cron job usecase",refreshToken);
        let expires_in = Date.now + refreshToken.expires_in * 1000 - 5 * 60000;
        let newData = { expires_in, access_token: refreshToken.access_token };
        await updateAllDataUsecase({ id: i.id, newData });
        }
    }               

      catch (error) {
        console.log(error, "error");
        // throw new Error(e);
      }
    }

  }
  module.exports = cronJobUsecase;