function makeaddDataInExcelUsecase({ XLSX, path }) {
  return async function generateExcelFile({ results }) {
    try {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(results);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const now = new Date();
      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0"); // January is 0
      const year = now.getFullYear().toString();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const fileName = `website-data-${month}-${day}-${year}-${hours}:${minutes}:${seconds}.xlsx`;

      // Define the file path
      const filePath = path.join("excel-files", fileName);

      // Write the workbook to a file
      XLSX.writeFile(workbook, filePath);

      console.log(`Excel file "${fileName}" generated successfully.`);
      // return fileName;
    } catch (error) {
      console.error("Error generating Excel file:", error);
    }
  };
}
module.exports = makeaddDataInExcelUsecase;
