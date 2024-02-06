// Import the 'node-fetch' library for making API requests
const fetch = require('node-fetch');

// Function to fetch all products, retrieve brand names, and store brand-wise counts
async function fetchAndStoreBrandCounts(accessToken, storeHash) {
  try {
    // Make the API request to fetch all products
    const productsResponse = await fetch(
      `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products`,
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
    }

    // Display the brand name and total product count for each brand
    for (const brandName in brandCounts) {
      console.log(`Brand: ${brandName}`);
      console.log(`Total Products: ${brandCounts[brandName]}`);
      console.log('------------------');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Replace these values with your actual credentials
const accessToken = 'Your Access Token';
const storeHash = 'Your Store Hash';

// Call the function
fetchAndStoreBrandCounts(accessToken, storeHash);
