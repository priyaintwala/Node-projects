function makeaddProductInExcelUsecase({ getBrandsUsecase }) {
  return async function addProductInExcelUsecase() {
    try {
      const brand = await getBrandsUsecase();

      // const workbook = xlsx.utils.book_new();
      // const worksheet = xlsx.utils.json_to_sheet(brand);

      // xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      // xlsx.writeFile(workbook, '/home/ad.rapidops.com/priya.intwala/Documents/Task4/productData.xlsx');

      console.log(
        "Dynamic data added to the existing Excel file successfully!"
      );
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = makeaddProductInExcelUsecase;
