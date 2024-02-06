
function makeformController() {
  return async function formController(req, res) {
    try {
      let message = "";
      if (req.query.submitted === "true") {
        const fileName = req.query.fileName;
        message = `The form is submitted and the excel file is generated in the folder "excel-files"`;
      }
     
      res.send(`<!DOCTYPE html>
         <html lang="en">
         <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>Keyword Counter</title>
             <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
             <script>
             $(document).ready(function() {
               $("#form").submit(function(event) {
                   event.preventDefault();

                   var inputData = $('#textarea').val();
                   var urls = inputData.split('\\n');
                   var uniqueUrls = [];

                   var URLL = urls.filter((item) => item !== "");

                   if(URLL.length>10){
                    $("#error-alert").html("<strong>Total URL cannot exceed 10</strong>");
                    $("#message").text("");
                    return false;
                   }

                  console.log(urls)
                  
                 for(let i=0;i<URLL.length;i++){
                 var url = URLL[i].trim();
                 try {
                   new URL(url);
                 } catch (error) {
                    $("#error-alert").html("<strong>Please enter a valid URL at line " + (i + 1) + "</strong>");
                    $("#message").text("");
                     return false;
                 }
                 if (uniqueUrls.includes(url)) {
                    $("#error-alert").html("<strong>Duplicate URL found at line " + (i + 1) + "</strong>");
                    $("#message").text("");
                    return false;
                  }
                  uniqueUrls.push(url);
               }
               this.submit()
            })
            })  

            </script>
             <style>
             body {
                 font-family: Arial, sans-serif;
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 height: 100vh;
                 margin: 0;
                 background-color: #f5f5f5;
             }
             .container {
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 flex-direction: column; 
             }
             
             .form-container {
                 background-color: #ffffff;
                 padding: 20px;
                 border-radius: 5px;
                 box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                 margin-bottom: 20px;
                 width: 70%; /* Adjust the width as needed */
                 display: flex;
                 flex-direction: column;
             }
             
             label {
                 display: block;
                 margin-bottom: 5px;
             }
             
             input[type="text"],
             textarea {
                 width: 100%;
                 padding: 5px;
                 margin-bottom: 10px;
                 border: 1px solid #ccc;
                 border-radius: 3px;
                 font-size: 14px;
             }
             
             .submit-container {
                 display: flex;
                 justify-content: flex-end;
             }
             
             input[type="submit"] {
                 background-color: #4CAF50;
                 color: white;
                 padding: 10px 20px;
                 border: none;
                 border-radius: 4px;
                 cursor: pointer;
                 font-size: 16px;
             }
             
             input[type="submit"]:hover {
                 background-color: #45a049;
             }
             
             .message {
                 text-align: center;
                 margin-top: 20px;
             }
             </style>
         </head>
         <body>
         <div class="container">
             <h2>Keyword Counter</h2>
             <div class="form-container">
                 <form method="POST" id="form">
                     <label for="url">URL:</label>
                     <textarea id="textarea" name="url" rows="30" cols="100" required></textarea>
                     <br>
                     <label for="keyword">Keyword:</label>
                     <input type="text" id="textbox" name="keyword" required>
                     <br>
                     <div class="submit-container">
                         <input type="submit" value="Submit">
                     </div>
                 </form>
             </div>
             
          <div>
           <div class="message" id="message">
            <h4>${message}</h4>
             </div>
             <div id="error-alert"></div>
         </body>
         </html>`);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = makeformController;


