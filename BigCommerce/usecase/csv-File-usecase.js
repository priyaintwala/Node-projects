function makecsvFileUsecase({fs,csvWriter,createProductDataAccess}){
    return async function csvFileUsecase(){
        
        const productcsvFile =createProductDataAccess.productcsvFile
        const result = await productcsvFile()
        console.log(productcsvFile,"productcsv in csvfile usecase");
        console.log(result,"productcsv in csvfile usecase");
        const filename = 'output.csv';
        const writer = csvWriter({ headers: Object.keys(productcsvFile[0]) });
        writer.pipe(fs.createWriteStream(filename));
    
        // Write each row of data
        // productcsvFile.forEach(row => {
        //   writer.write(row);
        // });
    
        // writer.end();
    
        // // Set the response headers for file download
        // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        // res.setHeader('Content-type', 'text/csv');
    
        // // Stream the file to the response
        // const fileStream = fs.createReadStream(filename);
        // fileStream.pipe(res);





        // const filename2 = 'output1.csv';
        // const writer1 = csvWriter({ headers: Object.keys(variantcsvFile[0]) });
        // writer1.pipe(fs.createWriteStream(filename2));
    
        // // Write each row of data
        // variantcsvFile.forEach(row => {
        //   writer1.write(row);
        // });
    
        // writer1.end();
    
        // // Set the response headers for file download
        // res.setHeader('Content-disposition', 'attachment; filename=' + filename2);
        // res.setHeader('Content-type', 'text/csv');
    
        // // Stream the file to the response
        // const fileStream1 = fs.createReadStream(filename2);
        // fileStream1.pipe(res);
    } 
}

module.exports=makecsvFileUsecase