function makegetAllCategoriesUsecase({ fetch }) {
  return async function getAllCategoriesUsecase() {
    let url =
      "https://api.bigcommerce.com/stores/*********8/v3/catalog/trees/categories";

    let options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": "***************",
      },
    };

    const response = await fetch(url,options);
    const getCategories = await response.json();
    return getCategories;

  };
}
module.exports = makegetAllCategoriesUsecase;
