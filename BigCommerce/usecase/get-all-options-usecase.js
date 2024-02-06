function makegetAllOptionUsecase({ fetch }) {
  return async function getAllOptionUsecase({ productId }) {
    try {
        let url =
        `https://api.bigcommerce.com/stores/***********/v3/catalog/products/${productId}/options`;
  
      let options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Auth-Token": "****************",
        },
      };
      const response = await fetch(url, options);
      const getAllOptionsResponse = await response.json();

    //   console.log("getAllOption Dta",getAllOptionsResponse);
      return getAllOptionsResponse.data;

    } catch (error) {
        console.log(error);
    }

  };
}
module.exports=makegetAllOptionUsecase
