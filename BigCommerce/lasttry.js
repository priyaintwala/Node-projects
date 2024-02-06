const getProduct = await getAllProductsUsecase();
// console.log(getProduct, "in usecase of excel");
const inputFile =
  "/home/ad.rapidops.com/priya.intwala/Documents/BigCommerce/ALLSRC_Catalog Upload Template.xlsx";

const workbook = new ExcelJS.Workbook();
const readInput = await workbook.xlsx.readFile(inputFile);

const worksheet = workbook.getWorksheet(1);

const startingRow = worksheet.lastRow ? worksheet.lastRow.number + 1 : 1;

getProduct.forEach((item, index) => {
  const row = worksheet.getRow(startingRow + index);
 
  let skus = [];

  if (
    item.variants &&
    Array.isArray(item.variants) &&
    item.variants.length > 0
  ) {
    row.getCell('A').value = item.sku;
    // for (let i = 0; i < item.variants.length; i++) {
    //   skus.push(item.variants[i].sku);
    // }
    skus = item.variants.map(variant => variant.sku);
  }
  console.log(skus,"skus");

  if (skus.length > 0) {
    skus.forEach((sku, skuIndex) => {
     
      const row1 = worksheet.getRow(startingRow + index + 1 + skuIndex);
      console.log(sku, "skuuu");
      console.log(skuIndex, "skuIndex");
      row1.getCell('A').value = sku;
    });
  }
  

//   row.getCell("B").value = item.name;
//   row.getCell("C").value = item.description;

//   if (item.custom_fields) {
//     if (
//       Array.isArray(item.custom_fields) &&
//       item.custom_fields.length > 0
//     ) {
//       for (let i = 0; i < item.custom_fields.length; i++) {
//         if (item.custom_fields[i].name == "Attribute_Unit of Measure") {
//           row.getCell("D").value = item.custom_fields[i].value;
//         }
//       }
//     } else {
//       row.getCell("D").value = "Each";
//     }
//   } else {
//     row.getCell("D").value = "Each";
//   }

//   row.getCell("E").value = 1;
//   row.getCell("F").value = "Y";
});

await workbook.xlsx.writeFile(inputFile);
console.log("Dynamic data added to existing Excel file successfully!");