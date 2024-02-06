
function makesearchWordUsecase({ fetch }) {
  return async function searchWordUsecase({ URL, keyword }) {
    try {
      const results = [];
      console.log(URL, "urllllllllllll", keyword, "KEYWORD");
      const URLL = URL.filter((item) => item !== "");

      const keywordArray = keyword.split(",").map((keyword) => keyword.trim());
      
      if (URL.length > 10) {
        throw new Error("URL array length cannot exceed 10");
      }

      for (const url of URLL) {
        const response = await fetch(url);
        const htmlContent = await response.text();
        const bodyRegex = /<body[^>]*>(.*?)<\/body>/is;
        const textContent = htmlContent
          .match(bodyRegex)[1]
          .replace(/<[^>]+>/g, "")
          .trim();
        // console.log(textContent);

        let replacedStr = textContent.replace(/\n/g, " ");
        let count = replacedStr.split(" ");

        // console.log(replacedStr, "all text content");

        const wordCount = count.length;
        console.log("Total word count:", wordCount);

      const keywordCounts = keywordArray.reduce((obj, keyword) => {
        obj[keyword] = countKeywordOccurrences(replacedStr, keyword);
        return obj;
      }, {});

      const result = {
        url: url,
        ...keywordCounts,
        TotalWords: wordCount,
      };
      results.push(result);
      
      }
      console.log("Search results:", results);
      return results;
    } catch (error) {
      console.error("Error fetching websites:", error.message);
      throw error.message;
    }
  };

  function extractTextFromHTML(htmlContent) {
    const element = document.createElement("div");
    element.innerHTML = htmlContent;
    return element.textContent || element.innerText || "";
  }

  function countKeywordOccurrences(content, keyword) {
    const regex = new RegExp(keyword, "gi");
    const matches = content.match(regex);
    return matches ? matches.length : 0;
  }
}

module.exports = makesearchWordUsecase;
