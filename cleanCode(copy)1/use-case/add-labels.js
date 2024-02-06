function makeAddLabels({addLabels,Joi,getLabelById,label,updateProvidersId}){
   return async function addLabel({id,labelName,providersId}){
  
    // label = JSON.parse(labelName);

    // for (let index = 0; index < label.length; index++) {
    //      let result = await addLabels({id,labelName:label[index]});
    // }
    // await addLabels({id,labelName})
    
  //   const labelEntity = await label({id,labelName,providersId,priority})

  //   console.log(getLabelById);
  //   let currentLabels = await getLabelById({id})
  //   let currentLabel = currentLabels.map((labels)=>{
  //     return (labels).toUpperCase();
  //   });
    
  //   if (currentLabel.length==0 || !currentLabel.includes(labelName.toUpperCase())){ 
  //     await addLabels({id,labelName,providersId,priority});
  //    } else{
  //      let r= await updateProvidersId({ id, labelName, providersId,priority}) 
  //     }
  //  }
  validation({id,labelName,providersId}); 
  console.log("id in labbelll",id);
  let currentLabels = await getLabelById({ id}); 
  console.log("id in labbelll after get lbel by id",id);
  let currentLabel = currentLabels.filter((labels) => { return labels == labelName; }); 
  console.log("filer function",currentLabel);
  let priority= currentLabels.length+1; 
  const labelEntity = await label({id,labelName,providersId,priority})

  if (currentLabel.length == 0) { 
    await addLabels({id,labelName,providersId,priority});
  } 
    else { 
      console.log("--------------------------------") ; 
    let r = await updateProvidersId({ id, labelName, providersId,priority}) ;
  } 
  return "added labels";
}

   function validation(input){
    const schema=Joi.object({
        id :Joi.string(),
        labelName:Joi.string(),
        providersId:Joi.string(),
       
    })
    const {error}= schema.validate(input);
   if (error) throw (error);
  }
}

module.exports=makeAddLabels
