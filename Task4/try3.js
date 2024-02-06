const xlsx = require('xlsx');

// Read the existing workbook from the Excel file
const workbook = xlsx.readFile('/home/ad.rapidops.com/priya.intwala/Documents/BigCommerce/ALLSRC_Catalog Upload Template.xlsx');

// Get the desired worksheet from the workbook
const worksheet = workbook.Sheets['Sheet1'];

// Create your data (replace this with your actual data)
const newData = [
  { Name: 'Product 1', Price: 10 },
  { Name: 'Product 2', Price: 20 },
  { Name: 'Product 3', Price: 30 },
];

// Determine the last row index in the worksheet
const lastRowIndex = worksheet['!ref'].split(':')[1];

// Convert the data to sheet format
const newSheetData = xlsx.utils.json_to_sheet(newData);

// Get the range of cells to add the new data
const range = `A${parseInt(lastRowIndex) + 2}`;

// Add the new data to the worksheet
xlsx.utils.sheet_add_json(worksheet, newData, { origin: range });

// Save the updated workbook back to the Excel file
xlsx.writeFile(workbook, '/home/ad.rapidops.com/priya.intwala/Documents/BigCommerce/ALLSRC_Catalog Upload Template.xlsx');

console.log('Data added to the Excel file.');

Object.keys(brandCounts).forEach((key) => {
  const value = brandCounts[key];
  console.log(`brandname: ${key}, count: ${value}`);
  let productData = {
    fulfillmentPartnerCode: fulfillmentPartnerCode,
    Brand: key,
    "Total SKU": value,
  };
  data.push(productData);
});