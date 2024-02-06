
function makeaddVariantApiUsease({ fetch ,addVariantInDb}) {
  return async function addVariantApiUsecase({
    getAllOptionData,
    productId,
    object,
  }) {
    try {
      for (let i = 0; i < object.length; i++) {
        const body = {
          sku: object[i].SKU,
          product_id: productId,
          option_values: [],
        };
         
        for(let j=0;j<getAllOptionData.length;j++){
             console.log(object[i].Attribute_Type,"object.Attribute_Type");
             display_name = "Attribute_" + getAllOptionData[j]["display_name"]
            //  console.log(display_name,"display_name");
            //  console.log(object[i][`${display_name}`],"object[i].display_name"); 

            //  console.log(nData[j]["option_values"],'getAllOptionData[j]["option_values"]');

            for(let k=0;k<getAllOptionData[j]["option_values"].length;k++){
                // console.log(object[i][Attribute_Type],"object[i][Attribute_Type]");
                // console.log(getAllOptionData[j]["option_values"][k],'getAllOptionData[j]["option_values"][k]');
                // console.log(getAllOptionData[j]["option_values"][k]["label"],'getAllOptionData[j]["option_values"][k]["label"]\n\n\n\n');
                // console.log(object[i],"object[i].display_name");
                // console.log(getAllOptionData[j]["option_values"][k]["label"],'getAllOptionData[j]["option_values"][k]["label"]');

                if(object[i][`${display_name}`] == getAllOptionData[j]["option_values"][k]["label"]){
                    let optvalue = {
                        id: getAllOptionData[j]["option_values"][k]["id"],
                        option_id: getAllOptionData[j]["id"]
                    };
                    body.option_values.push(optvalue)
                }
            }
        }
       
        let url = `https://api.bigcommerce.com/stores/*************/v3/catalog/products/${productId}/variants`;

        let options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Auth-Token": "*********************",
          },
          body: JSON.stringify(body),
        };

        const response = await fetch(url, options);
        const VariantsCreatedResponse = await response.json();

        console.log(VariantsCreatedResponse,"response of usecase of variant api");

        await addVariantInDb({rows:object[i],VariantsCreatedResponse})

      }
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = makeaddVariantApiUsease;
