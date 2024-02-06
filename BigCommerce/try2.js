function makeaddProductInExcelUsecase({
    getAllProductsUsecase,
    getAllCustomfeildUsecase,
    ExcelJS,
  }) {
    return async function addProductInExcelUsecase() {
      try {
        const getProduct = await getAllProductsUsecase();
        const inputFile =
          "/home/ad.rapidops.com/priya.intwala/Documents/BigCommerce/ALLSRC_Catalog Upload Template.xlsx";
  
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(inputFile);
  
        const worksheet = workbook.getWorksheet(1);
  
        const startingRow = worksheet.lastRow ? worksheet.lastRow.number + 1 : 1;
  
        getProduct.forEach((item, index) => {
          if (item.variants && Array.isArray(item.variants) && item.variants.length > 0) {
            item.variants.forEach((variant, variantIndex) => {
              const row = worksheet.getRow(startingRow + index + variantIndex);
              row.getCell("A").value = variant.sku;
              row.getCell("B").value = item.name;
              row.getCell("C").value = item.description;
  
              if (item.custom_fields && Array.isArray(item.custom_fields) && item.custom_fields.length > 0) {
                item.custom_fields.forEach((customField) => {
                  if (customField.name === "Attribute_Unit of Measure") {
                    row.getCell("D").value = customField.value;
                  }
                });
              } else {
                row.getCell("D").value = "Each";
              }
  
              row.getCell("E").value = 1;
              row.getCell("F").value = "Y";
            });
          } else {
            const row = worksheet.getRow(startingRow + index);
            row.getCell("A").value = item.sku;
            row.getCell("B").value = item.name;
            row.getCell("C").value = item.description;
  
            if (item.custom_fields && Array.isArray(item.custom_fields) && item.custom_fields.length > 0) {
              item.custom_fields.forEach((customField) => {
                if (customField.name === "Attribute_Unit of Measure") {
                  row.getCell("D").value = customField.value;
                }
              });
            } else {
              row.getCell("D").value = "Each";
            }
  
            row.getCell("E").value = 1;
            row.getCell("F").value = "Y";
          }
        });
  
        await workbook.xlsx.writeFile(inputFile);
        console.log("Dynamic data added to the existing Excel file successfully!");
      } catch (error) {
        console.log(error);
      }
    };
  }
  
  module.exports = makeaddProductInExcelUsecase;
  











   // row.getCell("A").value = item.sku;
        // if (item.variants) {
        //   // console.log(item.variants,"variants");
        //   if (Array.isArray(item.variants) && item.variants.length > 0) {
        //     let variantSkus = "";
        //     for (let i = 0; i < item.variants.length; i++) {
        //       variantSkus += item.variants[i].sku + "\n";
        //     }
        //     row.getCell("A").value += "\n" + variantSkus;
        //   }
        // }

        // let skus = [item.sku];

        // if (
        //   item.variants &&
        //   Array.isArray(item.variants) &&
        //   item.variants.length > 0
        //   // item.sku == "UPMC 950-WLT"
        // ) {
        //   // console.log(item.sku,"item.sku");
        //   // console.log(item.variants,"item.variants");
        //   for (let i = 0; i < item.variants.length; i++) {
        //     console.log(item.variants[i].sku,"item.variants[i].sku");
        //     skus.push(item.variants[i].sku);
        //   }
        // }
        // console.log(skus,"skus");
        // row.getCell('A').value = skus.join('\n');


 // const rowIndex = startingRow + index + 1 + skuIndex;
            // worksheet.getCell('A' + rowIndex).value = sku;








          //   for (let obj of getProduct) {
      //     let productId = obj.id;
      //     console.log(productId);
      //     //   const getCustomFeilds = await getAllCustomfeildUsecase({productId})
      //     //   console.log(getCustomFeilds,"getCustomFeilds");
      //   }