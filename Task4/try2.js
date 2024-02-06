// Import the required libraries
const fetch = require('node-fetch');
const fs = require('fs');
const xlsx = require('xlsx');

// Function to fetch all products, retrieve brand names, and store brand-wise counts
async function fetchAndStoreBrandCounts(accessToken, storeHash) {
  try {
    // Make the API request to fetch all products
    const productsResponse = await fetch(
      `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products?include=variants`,
      {
        headers: {
          'X-Auth-Token': accessToken,
          Accept: 'application/json',
        },
      }
    );
    const productsData = await productsResponse.json();

    // Create an object to store brand-wise counts
    const brandCounts = {};

    // Iterate through each product and count the products per brand
    for (const product of productsData.data) {
      const brandId = product.brand_id;

      // Fetch the brand details using the brand ID
      const brandResponse = await fetch(
        `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/brands/${brandId}`,
        {
          headers: {
            'X-Auth-Token': accessToken,
            Accept: 'application/json',
          },
        }
      );
      const brandData = await brandResponse.json();

      const brandName = brandData.data.name;

      if (brandCounts[brandName]) {
        brandCounts[brandName]++;
      } else {
        brandCounts[brandName] = 1;
      }

      // Count variants if available
      if (product.variants && product.variants.length > 0) {
        brandCounts[brandName] += product.variants.length;
      }
    }

    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet([]);

    // Add headers to the worksheet
    const headers = ['Brand Name', 'Total Products'];
    const headerRow = xlsx.utils.sheet_add_json(worksheet, [{}], { header: headers, skipHeader: true });

    // Populate the worksheet with brand information
    let rowIndex = 2;
    for (const brandName in brandCounts) {
      xlsx.utils.sheet_add_json(worksheet, [{ 'Brand Name': brandName, 'Total Products': brandCounts[brandName] }], { skipHeader: true, origin: `A${rowIndex}` });
      rowIndex++;
    }

    // Add the worksheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Brand Information');

    // Save the workbook to a file
    const excelFilePath = 'brand_information.xlsx';
    xlsx.writeFile(workbook, excelFilePath);

    console.log(`Brand information saved to ${excelFilePath}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Replace these values with your actual credentials
const accessToken = 'Your Access Token';
const storeHash = 'Your Store Hash';

// Call the function
fetchAndStoreBrandCounts(accessToken, storeHash);
