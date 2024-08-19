const express = require("express");
const cors = require("cors");
const scrapeContent = require("./lib/scrapeContent");
const app = express();
const port = 3001;
const getHTMLFetch = require("./lib/getHTML")
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://lostmypillow.github.io/jDMS-web"
  );
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:5173"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.get("/test", async (req, res) => {
  res.json(await scrapeContent(decodeURI(req.query.url)));
});

app.get("/fetch", async (req, res) => {
const v = await getHTMLFetch("https://www.techbang.com/posts/117423-idc-the-increasing-demand-for-ai-pc-and-ai-mobile-phone")
console.log(v)
  res.json({message: "yo" });
});


app.listen(port, () => {
  console.log(`JQuotes listening on port ${port}`);
});
