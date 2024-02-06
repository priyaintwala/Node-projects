function makeaddProductInExcelController({
    addProductUsecase
}){
   return async function addProductInExcelController(req,res){
    try {
        console.log("in controller read file in try");
        const productDataSheet = await addProductUsecase();
    } catch (error) {
        console.log(error);
    }
   }
}
module.exports=makeaddProductInExcelController;