function makereadExcelFileController({
    readFileExcelUsecase
}){
   return async function readExcelFileController(req,res){
    try {
        console.log("in controller read file in try");
        const productDataSheet = await readFileExcelUsecase();
        
    } catch (error) {
        console.log(error);
    }
   }
}
module.exports=makereadExcelFileController;