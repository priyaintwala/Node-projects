function makecsvFileController({
    fs
}){
   return async function csvFileController(req,res){
    try {
            // Read the CSV file
            let {filename} = req.params;
            fs.readFile(`/home/ad.rapidops.com/priya.intwala/Documents/BigCommerce/${filename}`, (err, data) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to read CSV file' });
              }
              // Set the appropriate headers for the HTTP response
              res.setHeader('Content-Type', 'text/csv');
              res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
          
              // Send the CSV file as the response
              res.send(data);
            });
            
        // console.log("in controller csv file in try");
        // const productDataSheet = await csvFileUsecase();
        
    } catch (error) {
        console.log(error);
    }
   }
}
module.exports=makecsvFileController;