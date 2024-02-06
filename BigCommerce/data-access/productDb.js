function makecreateProduct({connection}){
    return {createProduct,createVariant,variantcsvFile,productcsvFile}
    
    async function createProduct({
       values
    }){
       
            // console.log(values,"in db");
            const value =[
                values.productId,
                values.SKU,
                values.productName,
                values.FulfillmentPartnerCode,
                values.ManufacturerPartNumber,
                values.LeadTime,
                values.Manufacturer,
                values.error,
                values.created
            ]
            let sql = `INSERT INTO products ( productId, SKU,productName,FulfillmentPartnerCode,ManufacturerPartNumber,LeadTime, Manufacturer,error,created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            // let product = await connection.query(`INSERT INTO products ( productId, SKU,productName,FulfillmentPartnerCode,ManufacturerPartNumber,LeadTime, Manufacturer,error,created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,value);

            connection.query(sql, value, (err, result, feild) => {
                if (err) {
                  console.log(err);
                  throw err;
                } else {
                  console.log("result", result);
                }
              });
       
    }


    async function createVariant({variantvalues}){
        // try {
        //     console.log(values,"in db");
            const value =[
                variantvalues.productId,
                variantvalues.SKU,
                variantvalues.VariantId,
                variantvalues.FulfillmentPartnerCode,
                variantvalues.ManufacturerPartNumber,
                variantvalues.LeadTime,
                variantvalues.Manufacturer,
                variantvalues.created
            ]
            let sql = `INSERT INTO variants( productId, SKU,VariantId,FulfillmentPartnerCode,ManufacturerPartNumber,LeadTime, Manufacturer,created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

            connection.query(sql, value, (err, result, feild) => {
                if (err) {
                  console.log(err);
                  throw err;
                } else {
                  console.log("result", result);
                }
              });
        //     let product = await connection.query(`INSERT INTO products ( productId, SKU,VariantId,FulfillmentPartnerCode,ManufacturerPartNumber,LeadTime, Manufacturer,created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,value);
        // } catch (error) {
        //     throw error;
        // } 
    }

    async function productcsvFile(){

        const result = await connection.query('SELECT * FROM products');
        console.log(result,"productcsv");
        return result;

        // connection.query(query, (error, results) => {
        //   if (error) {
        //     console.error('Error executing query:', error);
        //     connection.end();
        //     return res.status(500).send('Internal Server Error');
        //   }
        // })
    }

    async function variantcsvFile(){
        const result = connection.query('SELECT * FROM variants');
        console.log(result,"variantcsv");
        // return result;

        // connection.query(query, (error, results) => {
        //   if (error) {
        //     console.error('Error executing query:', error);
        //     connection.end();
        //     return res.status(500).send('Internal Server Error');
        //   }
        // })
    }
}

module.exports=makecreateProduct