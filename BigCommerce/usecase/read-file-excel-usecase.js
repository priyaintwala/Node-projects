
function makereadFileExcelUsecase({xlsx,addProductInBigCommerceUsecase}){
    
    return async function readFileExcelUsecase(){
        try {
            console.log("in usecase read file in try");

            const filePath = 'Product-Import-Sample-1.xlsx';

            const xlsxData = xlsx.readFileSync(filePath);
            let productDataSheet = xlsxData.SheetNames;
    
            let productSheet = xlsxData.Sheets[productDataSheet[0]];

            let jsonData = xlsx.utils.sheet_to_json(productSheet)
            // console.log(jsonData,"data of sheet in json");

           await addProductInBigCommerceUsecase({jsonData});
           return jsonData;

        } catch (error) {
            console.log(error);
            throw error;
        } 
    }
}
module.exports=makereadFileExcelUsecase