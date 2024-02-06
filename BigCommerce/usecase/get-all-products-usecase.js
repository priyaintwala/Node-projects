function makegetAllProductsUsecase({ fetch }) {
  return async function getAllProductsUsecase() {
    try {
      let url =
        "https://api.bigcommerce.com/stores/*******/v3/catalog/products?include=custom_fields,variants";

      let options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Auth-Token": "*************",
        },
      };
      const response = await fetch(url, options);
      const getProductData = await response.json();
      console.log(
        getProductData.meta.pagination.total_pages,
        "getCustomfields"
      );

      let currentPage = 1;
      const totalPages = getProductData.meta.pagination.total_pages;

      // Store the product data in an array
      let allProducts = getProductData.data;

      while (currentPage < totalPages) {
        currentPage++;
        console.log(currentPage, "currentPage");

        let aurl = `https://api.bigcommerce.com/stores/***********/v3/catalog/products?include=custom_fields,variants&limit=50&page=${currentPage}`;
     

        const nextPageResponse = await fetch(aurl, options);
        const nextPageData = await nextPageResponse.json();

        allProducts.push(...nextPageData.data);
      }
      // console.log(allProducts);
      return allProducts;

    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = makegetAllProductsUsecase;
