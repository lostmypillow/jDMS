const express = require("express");
const cors = require("cors");
const scrapeContent = require("./lib/scrapeContent");
const app = express();
const port = 3001;

app.use(cors());

app.get("/test", async (req, res) => {
  res.json(await scrapeContent(decodeURI(req.query.url)));
});

app.listen(port, () => {
  console.log(`JQuotes listening on port ${port}`);
});
