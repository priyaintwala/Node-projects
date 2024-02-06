module.exports = function createAddProductdb({ createProductDataAccess }) {
    return async function addProductdb({  rows,sku,
      addProduct}) {
      console.log("add product in db");
      const values = {
       SKU:sku,
       productName:rows["Product Name"],
       FulfillmentPartnerCode: rows["FulfillmentPartnerCode"],
       ManufacturerPartNumber:(rows["ManufacturerPartNumber"]).toString(),
       LeadTime:rows["LeadTime"],
       Manufacturer:rows["Manufacturer"],
      }
      console.log(values,"values in add product");
      console.log((typeof values.ManufacturerPartNumber),"type of mpn");
        if (addProduct.errors) {
          console.log(addProduct.errors,"---------errorrrrrrr-----------------------!!");
          (values.error = addProduct.title),
          (values.created = false);
        } else {
          (values.created = true),
          (values.productId = addProduct.data.id);
        }
        console.log(createProductDataAccess,"..................!!!!!!!!");
        const createProductDataAccessResult = await createProductDataAccess.createProduct(
          {values}
        );
    };
  };
  