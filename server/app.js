const express = require("express");
const cors = require("cors");
const getCool3C = require("./lib/getCool3C");
const getMashdigi  = require ("./lib/getMashdigi")
const app = express();
const port = 3000;

app.use(cors());
app.get("/test", async (req, res) => {
  const decodedLink = decodeURI(req.query.url);
  switch (true) {
    case decodedLink.includes("cool3c"):
      var content = await getCool3C(decodedLink);
      res.json({ decodedLink, content });
      break;
    case decodedLink.includes("mashdigi"):
      var content = await getMashdigi(decodedLink);
      res.json({ decodedLink, content });  
    default:
      console.log(`Default`);
  }
});

app.listen(port, () => {
  console.log(`JQuotes listening on port ${port}`);
});
