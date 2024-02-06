function makegetBrandsUsecase({ fetch, getProductApiUsecase, xlsx }) {
  return async function getBrandsUsecase() {
    try {
      console.log("in brand usecase");
      const productsData = await getProductApiUsecase();

      console.log(productsData, "productData");
      console.log("after api call of get product");
      const brandCounts = {};
      const data = [];
      let PartnerCode = [];
      console.log(PartnerCode, "where it is declared");

      for (const product of productsData) {
        if (product.brand_id !== 0) {
          console.log("in for loop");
          const brandId = product.brand_id;
          console.log(brandId, "brandId");

          let url = `https://api.bigcommerce.com/stores/*******/v3/catalog/brands/${brandId}`;

          let options = {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-Auth-Token": "***************************",
            },
          };
          const response = await fetch(url, options);
          const brandData = await response.json();
          console.log("after fetching the res of brand");

          const { brandName = brandData.data.name, variants } = product;
          console.log(brandName, "bramdnameeeeeeeeeeee");
          if (!brandCounts.hasOwnProperty(brandName)) {
            brandCounts[brandName] = 1;
          } else {
            brandCounts[brandName] += 1;
            brandCounts[brandName] += variants.length;
          }


          if (product.custom_fields && product.custom_fields.length > 0) {
            // console.log(product.custom_fields,"product.customfeilds");
            product.custom_fields.map((x) => {
              if (x.name == "FulfillmentPartnerCode") {
                let fulFPCdata = {
                  brand: brandName,
                  code: x.value,
                };
                PartnerCode.push(fulFPCdata);
              } 
            });
          }
        }
      }

      Object.keys(brandCounts).forEach((key) => {
        const value = brandCounts[key];
        console.log(`brandname: ${key}, count: ${value}`);

        PartnerCode.forEach((x) => {
          if (x.brand == key) {
            let productData = {
              fulfillmentPartnerCode: x.code,
              Brand: key,
              "Total SKU": value+1,
            };
            data.push(productData);
          }
        });
      });

      // Create a new Set with custom comparison
      let uniqueObjects = new Set(
        data.map((obj) => JSON.stringify(obj, Object.keys(obj).sort()))
      );

      // Retrieve the unique objects as an array
      let uniqueArray = Array.from(uniqueObjects, (str) => JSON.parse(str));

      console.log(uniqueArray);

      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(uniqueArray);

      xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      xlsx.writeFile(
        workbook,
        "/home/ad.rapidops.com/priya.intwala/Documents/Task4/productData.xlsx"
      );

      console.log("data succesfully added in excel");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = makegetBrandsUsecase;
