  // if(created==true){
            //     let product = await connection.query(`INSERT INTO products ( productId,
            //         SKU,
            //         productName,
            //         FulfillmentPartnerCode,
            //         ManufacturerPartNumber,
            //         LeadTime,
            //         Manufacturer,
            //         error,
            //         created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[ 
            //             productId,
            //             SKU,
            //             productName,
            //             FulfillmentPartnerCode,
            //             ManufacturerPartNumber,
            //             LeadTime,
            //             Manufacturer,
            //             error,
            //             created]);
            //     console.log(product,"Product created");
            //     // return product;
            // }else{
            //     let product = await connection.query(`INSERT INTO products ( productId,
            //         SKU,
            //         productName,
            //         FulfillmentPartnerCode,
            //         ManufacturerPartNumber,
            //         LeadTime,
            //         Manufacturer,
            //         error,
            //         created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,[ 
            //             productId,
            //             SKU,
            //             productName,
            //             FulfillmentPartnerCode,
            //             ManufacturerPartNumber,
            //             LeadTime,
            //             Manufacturer,
            //             error,
            //             created]);
            //     console.log(product,"Product created");
            //     // return product;
            // }




// "use strict";
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable("products", {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER(255),
//       },
//       productId: {
//         type: Sequelize.INTEGER(255),
//         allowNull: true,
//         unique: true,
//       },
//       SKU: {
//         type: Sequelize.STRING(50),
//         allowNull: false,
//         unique: true,
//       },
//       ProductName: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       FulFillmentPartnerCode: {
//         type: Sequelize.STRING,
//       },
//       ManuFacturerPartNumber: {
//         allowNull: false,
//         type: Sequelize.STRING(255),
//       },
//       LeadTime: {
//         allowNull: false,
//         type: Sequelize.INTEGER,
//       },
//       ManuFacturer: {
//         allowNull: false,
//         type: Sequelize.STRING(255),
//       },
//       error: {
//         type: Sequelize.STRING(255),
//         allowNull: true,
//       },
//       created: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//         defaultValue: false,
//       },
//       createdAt: {
//         type: "TIMESTAMP",
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//         allowNull: false,
//       }
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable("products");
//   },
// };



// id: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: Sequelize.INTEGER(255),
//   },
//   productId: {
//     type: Sequelize.INTEGER(255),
//     allowNull: true,
//     unique: true,
//   },
//   SKU: {
//     type: Sequelize.STRING(50),
//     allowNull: false,
//     unique: true,
//   },
//   ProductName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   FulFillmentPartnerCode: {
//     type: Sequelize.STRING,
//   },
//   ManuFacturerPartNumber: {
//     allowNull: false,
//     type: Sequelize.STRING(255),
//   },
//   LeadTime: {
//     allowNull: false,
//     type: Sequelize.INTEGER,
//   },
//   ManuFacturer: {
//     allowNull: false,
//     type: Sequelize.STRING(255),
//   },
//   error: {
//     type: Sequelize.STRING(255),
//     allowNull: true,
//   },
//   created: {
//     type: Sequelize.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   },
//   createdAt: {
//     type: "TIMESTAMP",
//     defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
//     allowNull: false,
//   }



const ExcelJS = require('exceljs');

const inputFile = 'path/to/existing-file.xlsx';

// Sample dynamic data array
const dynamicData = [
  { name: 'John', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 35 },
];

// Load the existing Excel file
const workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile(inputFile)
  .then(() => {
    // Access the worksheet you want to add data to (e.g., first worksheet)
    const worksheet = workbook.getWorksheet(1);

    // Determine the starting row to add data
    const startingRow = worksheet.lastRow ? worksheet.lastRow.number + 1 : 1;

    // Add dynamic data rows
    dynamicData.forEach((item, index) => {
      const row = worksheet.getRow(startingRow + index);

      row.getCell('A').value = item.name;
      row.getCell('B').value = item.age;
    });

    // Save the modified workbook back to the existing Excel file
    return workbook.xlsx.writeFile(inputFile);
  })
  .then(() => {
    console.log('Dynamic data added to existing Excel file successfully!');
  })
  .catch((error) => {
    console.error('Error saving Excel file:', error);
  });






















  function makeaddProductInExcelUsecase({
    getAllProductsUsecase,
    getAllCustomfeildUsecase,
    ExcelJS,
  }) {
    return async function addProductInExcelUsecase() {
      try {
        const getProduct = await getAllProductsUsecase();
        // console.log(getProduct, "in usecase of excel");
        const inputFile =
          "/home/ad.rapidops.com/priya.intwala/Documents/BigCommerce/ALLSRC_Catalog Upload Template.xlsx";
        //   for (let obj of getProduct) {
        //     let productId = obj.id;
        //     console.log(productId);
        //     //   const getCustomFeilds = await getAllCustomfeildUsecase({productId})
        //     //   console.log(getCustomFeilds,"getCustomFeilds");
        //   }
        const workbook = new ExcelJS.Workbook();
        const readInput = await workbook.xlsx.readFile(inputFile);
  
        const worksheet = workbook.getWorksheet(1);
  
        const startingRow = worksheet.lastRow ? worksheet.lastRow.number + 1 : 1;
  
        getProduct.forEach((item, index) => {
          const row = worksheet.getRow(startingRow + index);
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
  
          let skus = [];
  
          if (
            item.variants &&
            Array.isArray(item.variants) &&
            item.variants.length > 0
          ) {
            for (let i = 0; i < item.variants.length; i++) {
              skus.push(item.variants[i].sku);
            }
          }
          console.log(skus,"skus");
  
          if (skus.length > 0) {
            skus.forEach((sku, skuIndex) => {
              const row1 = worksheet.getRow(skuIndex + 1);
              row1.getCell('A').value = sku;
            });
          } else {
            row.getCell("A").value = item.sku;
          }
  
          row.getCell("B").value = item.name;
          row.getCell("C").value = item.description;
  
          if (item.custom_fields) {
            if (
              Array.isArray(item.custom_fields) &&
              item.custom_fields.length > 0
            ) {
              for (let i = 0; i < item.custom_fields.length; i++) {
                if (item.custom_fields[i].name == "Attribute_Unit of Measure") {
                  row.getCell("D").value = item.custom_fields[i].value;
                }
              }
            } else {
              row.getCell("D").value = "Each";
            }
          } else {
            row.getCell("D").value = "Each";
          }
  
          row.getCell("E").value = 1;
          row.getCell("F").value = "Y";
        });
  
        await workbook.xlsx.writeFile(inputFile);
        console.log("Dynamic data added to existing Excel file successfully!");
      } catch (error) {
        console.log(error);
      }
    };
  }
  module.exports = makeaddProductInExcelUsecase;
  