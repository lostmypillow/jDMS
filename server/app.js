const express = require("express");
const cors = require("cors");
const scrapeContent = require("./lib/scrapeContent");
const app = express();
const port = 3000;

app.use(cors());

app.get("/test", async (req, res) => {
  var data = await scrapeContent(decodeURI(req.query.url));
  res.json({ data });
});

app.listen(port, () => {
  console.log(`JQuotes listening on port ${port}`);
});
