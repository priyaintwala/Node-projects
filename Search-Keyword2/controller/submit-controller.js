function makeformSubmitController({ formSubmitUsecase,fetch }) {
  return async function formSubmitController(req, res) {
    try {
      const { url, keyword } = req.body;

      const URL = url.split("\n").map(item=>item.trim());
      console.log(URL,"URL",keyword,"KEYWORD");
      
      const fileName = await formSubmitUsecase({ URL, keyword });
      // console.log(fileName,"filename",/?submitted=true&fileName=${fileName});

      res.redirect(`/?submitted=true`)

   
    } catch (error) {
      // console.log(error,"======================");
      res.redirect(`/?error=${error}`)
      // res.render('/',{error:error.message})
    }
  };
}
module.exports = makeformSubmitController;
