function makecustomFeildUsecase() {
  return async function customFieldUsecase({ rows }) {
    try {     
      const customFeildsArr = Object.entries(rows)
        .filter(([name,value]) => name.startsWith("Attribute_") && value !== '')
        .map(([name, value]) => ({
            name, value : value.toString()
        }));

        return customFeildsArr;
    } catch (error) {
      console.log(error,"error in custom field uecase");
    }
  };
}
module.exports=makecustomFeildUsecase