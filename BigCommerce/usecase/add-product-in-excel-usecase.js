function makeaddProductInExcelUsecase({
  getAllProductsUsecase,
  xlsx,
  getAllCategoriesTreeUsecase,
}) {
  return async function addProductInExcelUsecase() {
    try {
      const getCategoryTree = await getAllCategoriesTreeUsecase();
      // console.log(getCategoryTree);
      // console.log(getCategoryTree.data,"dataaa")
      let onlyCategoryId = [];
      for (let i = 0; i < getCategoryTree.data.length; i++) {
        if (
          getCategoryTree.data[i].name == "Accessories & Tools" ||
          getCategoryTree.data[i].name == "Communication" ||
          getCategoryTree.data[i].name == "Door Hardware" ||
          getCategoryTree.data[i].name == "Electronic Access Control" ||
          getCategoryTree.data[i].name == "Security Integration"
        ) {
          onlyCategoryId.push(getCategoryTree.data[i].id);
        }
      }
      console.log(onlyCategoryId);

      const getProduct = await getAllProductsUsecase();

      

      const data = [];

      getProduct.forEach((product) => {
        // if(product.name == "BEST 45H Series Heavy Duty Mortise Lock, Privacy (F19) Function"){
        let flag = false;
        onlyCategoryId.map((id) => {
          if (product.categories.includes(id)) {
            flag = true;
          }
        });
        if (flag == true) {
          let customfeild;
          if (product.custom_fields.length > 0) {
            for (let i = 0; i < product.custom_fields.length; i++) {
              if (
                product.custom_fields[i].name == "Attribute_Unit of Measure"
              ) {
                customfeild = product.custom_fields[i].value;
              }
            }
          } else {
            customfeild = "each";
          }

          console.log(customfeild);

          let desc;
          if (product.description) {
            if (product.description.includes("<p>")) {
              let splitDesc = product.description.split(/<p>|<\/p>/);
              let dataInsideP = splitDesc[1];
              console.log(dataInsideP);
              // const divTag = '';
              const contentBeforeDiv = dataInsideP.split('<div class="resource">')[0].trim();
              console.log(contentBeforeDiv,"-----------------------------------");
              desc = contentBeforeDiv;
            } else {
              const contentBeforeDiv1 = product.description.split('<div class="resource">')[0].trim();
              console.log(contentBeforeDiv1,"==============================================");
              desc = contentBeforeDiv1;
              
            }
          }
          console.log(product.id, "idddddddddddddddddddddd");
        

          const productData = {
            "Item Code": product.sku,
            Description: product.name,
            "Long Description": desc,
            "UOM Code": customfeild,
            QOM: 1,
            Orderable: "Y",
            "Manufacturer Name": product.mpn,
          };
          data.push(productData);
          if (product.variants.length > 0) {
            for (let i = 0; i < product.variants.length; i++) {
              if (product.sku !== product.variants[i].sku) {
                const variantData = {
                  "Item Code": product.variants[i].sku,
                  Description: product.name,
                  "Long Description": desc,
                  "UOM Code": customfeild,
                  QOM: 1,
                  Orderable: "Y",
                  "Manufacturer Name": product.mpn,
                };
                data.push(variantData);
              }
            }
          }
        }
      // }
      });
      console.log(data, "dataaaaaaaaaaaaaaa");

      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.json_to_sheet(data);

      xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      xlsx.writeFile(workbook, '/home/ad.rapidops.com/priya.intwala/Documents/BigCommerce/ALLSRC_Catalog Upload Template.xlsx');

      console.log(
        "Dynamic data added to the existing Excel file successfully!"
      );
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = makeaddProductInExcelUsecase;
