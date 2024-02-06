function makeformSubmitUsecase({addDataInExcelUsecase,searchWordUsecase}) {
  return async function formSubmitUsecase({ URL, keyword }) {
    try {
      const results = await searchWordUsecase({URL,keyword});
      
      console.log(results,"results in form submit usecase");
       
      if(results!== undefined){
        const data =await addDataInExcelUsecase({results})
        return data;
      }
    } catch (error) {
      
      console.log(error,"-------------------");
      throw error;
    }
  };
}

module.exports = makeformSubmitUsecase;
