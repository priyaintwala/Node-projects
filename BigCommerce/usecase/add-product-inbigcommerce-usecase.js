
function makeaddProductInBigCommerceUsecase({addProductApiUsecase,addOptionApiUsecase,customFieldUsecase,addCategoryUsecase,addProductInDBUsecase}) {
  return async function addProductInBigCommerceUsecase({jsonData}) {
    try {

      //  console.log("\n\nin add product usecase\n\n");
      //  console.log(jsonData);

       const groupedItems = jsonData.reduce((acc, item) => {
        const key = item["Primary SKU"];
        // console.log(key,"keyyyyyyyyyyyyyyyy");

        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});

      const keys = Object.keys(groupedItems);
      
    //   console.log(keys,"keyssssssssssssssss of grouped item");

      for(let i=0;i<keys.length;i++){
        // console.log("xxxxxxxxxxxxx",keys[i],"----",i);
        // console.log("groupItemskey[i] that is object",groupedItems[keys[i]]);

        if(keys[i] === 'x' ){
            for(let rows of groupedItems[keys[i]]){
                // console.log("rowssss",rows);

                if (rows["Category"]) {
                      const addCategoryResult = await addCategoryUsecase({ rows });
                    }

                const addCustomField = await customFieldUsecase({
                  rows,
                })
                
                const addProduct = await addProductApiUsecase({
                    rows, 
                    sku:rows.SKU,
                })

              // if(rows.SKU=="UPMC-492"){
              //   const addProduct = await addProductApiUsecase({
              //     rows, 
              //     sku:rows.SKU,
              // })

                const addProductInDb = await addProductInDBUsecase({
                  rows,
                  sku:rows.SKU,
                  addProduct
                })

                if(addProduct.errors){
                  throw addProduct.title
                }
              // }
              

                // if(addProduct.errors){
                //   throw addProduct.title
                // }
            }
         }
         else{
          // if(keys[i] === 'UPMC 780-LYNXS-SW'){

            if(groupedItems[keys[i]][0]['Category']){
              const addCategory = await addCategoryUsecase({
                rows:groupedItems[keys[i]][0]
              })
            }
            
            const addCustomField = await customFieldUsecase({
              rows:groupedItems[keys[i]][0],
            })
            console.log("addCustomField",addCustomField);
            
           
            const addProduct = await addProductApiUsecase({
                   rows:groupedItems[keys[i]][0],
                   sku:groupedItems[keys[i]][0]['Primary SKU'],
                   addCustomField,
            })
            console.log(addProduct,"addProduct.data.id");

            const addProductInDb = await addProductInDBUsecase({
              rows:groupedItems[keys[i]][0],
              sku:groupedItems[keys[i]][0]['Primary SKU'],
              addProduct
            })

            const addOpions = await addOptionApiUsecase({
                productId: addProduct.data.id,
                object: groupedItems[keys[i]],
            }) 

           
         }
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports=makeaddProductInBigCommerceUsecase
