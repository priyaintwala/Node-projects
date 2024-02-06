function makeaddOptionApiUsecase({ fetch ,getAllOptionUsecase, addVariantApiUsecase}) {
  return async function addOptionApiUsecase({ productId, object }) {
     console.log(object,"add option in apiusecase object");

    let array = [];
    for (let i of object) {
      let variants = i.Variants;
      // console.log(variants,"\n\n\n\n\nvariants\n\n\n\n",);

      if (typeof variants === "string") {
        let variantArray = variants.split(";");
        // console.log("vaaaaaaa", variantArray);
        for (let j of variantArray) {
          array.push(j);
        }
      }
      array = [...new Set(array)];
      // console.log(array,"\n\n\n\n\nnewwarrayyyy\n\n\n\n\n\n");
    }

    const variantsValueObj = {};
    array.forEach((value) => {
      variantsValueObj[value] = [];

      object.forEach((obj) => {
        if (!variantsValueObj[value].includes(obj[value])) {
          variantsValueObj[value].push(obj[value]);
        }
      });
    });

    // console.log("variantsValueObj ", variantsValueObj);

    let variantsOptionArr = [];
    for (let i = 0; i < array.length; i++) {
      array.forEach((part) => {
        const value = part.split("_")[1];
        if (!variantsOptionArr.includes(value)) {
          variantsOptionArr.push(value);
        }
      });
      // console.log("variantsOptionArr", variantsOptionArr);
    }

    let url = `https://api.bigcommerce.com/stores/***********/v3/catalog/products/${productId}/options`;

    let optionValues = [];

    for (let i in variantsValueObj) {
      const value = variantsValueObj[i];

      const newOption = value.map((val) => ({
        label: val,
      }));
      // console.log(newOption, "newOption");
      optionValues.push(newOption);
    }
    // console.log("option values", optionValues);

    for (let i = 0; i < variantsOptionArr.length; i++) {
      let body = {
        product_id: productId,
        display_name: variantsOptionArr[i],
        type: "radio_buttons",
        option_values: optionValues[i],
      };

      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Auth-Token": "***************************",
        },
        body: JSON.stringify(body),
      };

      // console.log(body, "bodyyyyyyyyyyy");

      const response = await fetch(url, options);
      const optionResponse = await response.json();
      console.log(optionResponse, "option created in add option api usecase");

      // const values = optionResponse["data"]["id"];
      // console.log("options created respnse data of id ",values);
      // option_id.push(values);
    }

    const getAllOptionData = await getAllOptionUsecase({productId})
    console.log(getAllOptionData,"option data of all");

    const addVariant = await addVariantApiUsecase({
      getAllOptionData,
      productId,
      object
    })

  };
}

module.exports = makeaddOptionApiUsecase;
