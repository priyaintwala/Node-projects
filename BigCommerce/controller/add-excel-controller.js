function makeaddProductInExcelController({
    addProductInExcelUsecase
}){
   return async function addProductInExcelController(req,res){
    try {
        console.log("in controller read file in try");
        const productDataSheet = await addProductInExcelUsecase();
        
    } catch (error) {
        console.log(error);
    }
   }
}
module.exports=makeaddProductInExcelController;