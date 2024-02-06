function makeaddCategoryUsecase({
  getAllCategoriesUsecase,
  addCategoryApiUsecase,
}) {
  return async function addCategoryUsecase({ rows }) {
    try {
    // console.log(rows["Category"],"log in add category usecase");
    // console.log(typeof rows["Category"],'rows["Category"]');

    const multipleCategory = rows["Category"].split();

    for (let i = 0; i < multipleCategory.length; i++) {
      let categoryArr = multipleCategory[i].split("|");
      console.log(categoryArr, "splitted by |");
      let name;

      for (let j = 0; j < categoryArr.length; i++) {
        const cPathName = categoryArr[i].split(",");
        console.log(cPathName, "cPathAndName splitted by ,");

        const getAllCategories = await getAllCategoriesUsecase();
        const allCategoriesData = getAllCategories.data;
        console.log(allCategoriesData, "data of category");

        const categoryPath = cPathName[1].split(":");
        console.log(categoryPath, "path of category splitted by :");
        const Path = categoryPath[1].split("/");
        console.log(Path, "path of category splitted by /");

        let checkCategoryExisted, parentId;

        for (let k of allCategoriesData) {
          checkCategoryExisted = 0;
          console.log(k, "kkkkkkkkkk");

          let [, ...a] = Path;
          console.log(Path,"Path");
          name = [...a];
          console.log(name, "nmeeeeeeee");
          console.log(k.name, "k of name");
          console.log(name[0], "name[0]");

          if (k.name === name[0].trim()) {
            checkCategoryExisted = 1;
            parentId = k.category_id;
            break;
          }
        }

        if (checkCategoryExisted === 1) {
          const childcategoryData = await childcategory({
            parentId,
            name,
          });
          
        } else {
          let body = {
            parent_id: 0,
            name: name[0].trim(),
          };
          console.log(body, "body in addcategory usecase");
          await addCategoryApiUsecase({ body });
        }
      }
    }

    async function childcategory({ name }) {
      const trimArray = name.map((str) => str.trim());
      console.log(trimArray, "trim array ");

      for (let k = 1; k < name.length; k++) {
        let flag = 0;
        let parenttID;
        let existedCategory = [name[0]];
        console.log(existedCategory, "existedCategory");

        const getAllCategories = await getAllCategoriesUsecase();
        const allCategoriesData = getAllCategories.data;

        for (let object of allCategoriesData) {
          if (object.name === name[k].trim()) {
            existedCategory.push(object.name);

            flag = 1;
            break;
          }
        }

        for (let object of allCategoriesData) {
          if (trimArray.includes(object.name)) {
            parenttID = object.category_id;
          }
        }

        if (flag === 0) {
          let body = {
            parent_id: parenttID,
            name: name[k].trim(),
          };
          console.log(body, "body whn flg 0");
          await addCategoryApiUsecase({ body });
        }
      }
    }
  } catch(error) {
      console.log(error,"error in add category usecase");
  }
}
}

module.exports = makeaddCategoryUsecase;
