function makegetLabelsById({getLabelsById,Joi}){
   return async function getLabelById({id}){
    console.log("in get labels")
     validation({id})
    //  try {
      // console.log(id,"id in get labels")
      let result = await getLabelsById({id});
      const labelData = [];
      // console.log(result,"result usecase");
      result.forEach((label)=>{
        labelData.push(label.label_name)
      })
      console.log("labelData",labelData);
      return labelData;
    //  } catch (error) {
    //    throw (error);
    //  }
   }
   function validation(input){
    const schema=Joi.object({
        id :Joi.string().required(),
    })
    const {error}= schema.validate(input);
   if (error) throw (error);
  }
}
// .details[0].message
module.exports=makegetLabelsById;