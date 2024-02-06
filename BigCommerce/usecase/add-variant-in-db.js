module.exports = function createAddVariantdb({ createProductDataAccess }) {
    return async function addVariantIndb({  rows,VariantsCreatedResponse}) {
      console.log("add variant in db");
      const variantvalues = {
       
       SKU:rows["SKU"],
       FulfillmentPartnerCode: rows["FulfillmentPartnerCode"],
       ManufacturerPartNumber:(rows["ManufacturerPartNumber"]).toString(),
       LeadTime:rows["LeadTime"],
       Manufacturer:rows["Manufacturer"],
      }
      if(VariantsCreatedResponse.errors){
        (variantvalues.created = false)
      }else {
          (variantvalues.created = true),
          (variantvalues.productId = VariantsCreatedResponse.data.product_id),
          (variantvalues.variantId = VariantsCreatedResponse.data.id)
        }
        const createVariantDataAccessResult = await createProductDataAccess.createVariant(
          {variantvalues});
    };
  };