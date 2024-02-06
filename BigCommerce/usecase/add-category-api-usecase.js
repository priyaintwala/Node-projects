function makeaddCategoriesApiUsecase({ fetch }) {
  return async function addCategoriesApiUsecase({ body }) {
    let url =
      "https://api.bigcommerce.com/stores/********/v3/catalog/categories";

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": "*******************",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    const addCategory = await response.json();
    return addCategory;
  };
}
module.exports = makeaddCategoriesApiUsecase;
