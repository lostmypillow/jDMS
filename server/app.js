const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// app.get("/", async (req, res) => {
//   async function getData() {
//     const url = "https://dummy-json.mock.beeceptor.com/posts";
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//       }

//       const json = await response.json();
//       console.log(json);
//       return json;
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
//   const test = await getData();
//   res.json({ a: 1, result: test });
// });
app.use(cors());
app.get("/test", async (req, res) => {
  const linky = decodeURI(req.query.url);
  const getQuotes = async () => {
    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will in full width and height)
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    const page = await browser.newPage();
    //
    // On this new page:
    // - open the "http://quotes.toscrape.com/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto(linky, {
      waitUntil: "domcontentloaded",
    });

    // Get page data
    const data = await page.evaluate(() => {
      // Fetch the first element with class "quote"
      const fullHTML = document.querySelector("*").outerHTML;
      console.log(fullHTML);
      const Title = document
        .querySelector("li.breadcrumb-item.active")
        .textContent.trim()
        .replace("\n", "");
      const getAuthor = document.querySelector("div.author").querySelector("a");
      const getDate = document
        .querySelector("div.created.slacken")
        .querySelectorAll("span")[1];
      const converted_date =
        getDate.textContent.split(" ")[0].replace(/\./g, "-") +
        " / Cool3c / " +
        getAuthor.textContent;
      // Fetch the sub-elements from the previously fetched quote element
      // Get the displayed text and return it (`.innerText`)
      // const text = quote.querySelector(".text").innerText;
      // const author = quote.querySelector(".author").innerText;

      return { Title, converted_date };
    });

    // Display the quotes

    // Close the browser
    await browser.close();
    return data;
  };

  // Start the scraping
  const quotes = await getQuotes();
  res.json(quotes);
});

app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});
app.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
