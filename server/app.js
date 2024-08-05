const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");
const getCool3C = require("./lib/getCool3C");
const app = express();
const port = 3000;

app.use(cors());
app.get("/test", async (req, res) => {
  const decodedLink = decodeURI(req.query.url);
  switch (true) {
    case decodedLink.includes("cool3c"):
      const quotes = await getCool3C(decodedLink);
      res.json({ decodedLink, quotes });
      break;
    case "Mangoes":
    case "Papayas":
      console.log("Mangoes and papayas are $2.79 a pound.");
      // Expected output: "Mangoes and papayas are $2.79 a pound."
      break;
    default:
      console.log(`Sorr.`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
