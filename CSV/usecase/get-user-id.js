function makegetUserByIdUsecase({ getUserByIdDataAccess, fs }) {
  return async function getuserByIdUsecase({ id, res }) {
    console.log(`getuserByIdUsecase uscase called ith data: ${id}`);

    // console.log(getUserByIdDataAccess);
    let userData = await getUserByIdDataAccess({ id });

    const csvData = userData.map((row) => Object.values(row).join(","));

    // Create the CSV file
    const filePath = 'users.csv';
    const csvContent = csvData.join('\n'); 
    fs.writeFileSync(filePath, csvContent);

       
 // Set response headers for CSV download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");

    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    // Send the CSV file as the response
    res.send(csvContent);

    return userData;
  };
}

module.exports = makegetUserByIdUsecase;
