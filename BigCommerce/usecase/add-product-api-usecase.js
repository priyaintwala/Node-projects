function makeaddProductApiUsecase({ fetch,getAllCategoriesUsecase }) {
  return async function addProductApiUsecase({ rows, sku ,addCustomField}) {
    try {

      let categoryId=[];
      let name;
      let array =[];
  
      if(rows["Category"]){
        const multipleCategory = rows["Category"].split();
  
      for (let i = 0; i < multipleCategory.length; i++) {
        let categoryArr = multipleCategory[i].split("|");
        
  
        for (let j = 0; j < categoryArr.length; j++) {
          const cPathName = categoryArr[j].split(",");
  
          const categoryPath = cPathName[1].split(":");
          const Path = categoryPath[1].split("/");
  
          let [, ...a] = Path;
          console.log(Path,"Path");
          name = [...a];
         
          for(let k=0;k<name.length;k++){
             array.push(name[k]);
          }
        }
      }
      let CategoryName = array.map((str)=>str.trim());
  
      let allCategoriesData = await getAllCategoriesUsecase();
      for(let data of allCategoriesData.data){
        if(CategoryName.includes(data.name)){
          categoryId.push(data.category_id);
        }
      }
    }
  
      let url =
        "https://api.bigcommerce.com/stores/***********/v3/catalog/products";
  
      let body = {
        brand_name: rows.Manufacturer,
        name: rows["Product Name"],
        type: "physical",
        sku: sku,
        weight: rows.Weight,
        price: rows.SellingPriceAnonymous,
        is_visible: rows.VisibleOnStoreFront,
        mpn: (rows.ManufacturerPartNumber).toString(),
        cost_price: rows.Cost,
        retail_price: rows.ListPrice,
        inventory_level: rows.Inventory,
        categories:categoryId,
        custom_fields: addCustomField,
      };
      console.log("bodyy in add product api",body);
  
      // let config = {
      //   method: "post",
      //   url: url,
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     "X-Auth-Token": "16t1jgx6gyllvyiy9sb0xd5ma19fddb",
      //   },
      //   data: JSON.stringify(body),
      // };
  
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Auth-Token": "******************",
        },
        body: JSON.stringify(body),
      };
  
  
      const response = await fetch(url, options);
      const productResponse = await response.json();
      // console.log(productResponse, "product created in add product big commerce usecase ");
      return productResponse;
      
      // axios(config)
      //   .then((response) => {
      //     console.log(response.data.data.id,"response.data of add productapi")
      //     return response.data;
      // })
      // .catch((error) => console.error("error:", error));
      
    } catch (error) {
      console.log(error,"error in add product api usecase");
    }
  
  };
}

module.exports = makeaddProductApiUsecase;
