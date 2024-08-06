const express = require("express");
const cors = require("cors");
const getCool3C = require("./lib/getCool3C");
const getMashdigi = require("./lib/getMashdigi");
const getSogi = require("./lib/getSogi");
const getCtee = require("./lib/getCtee");
const getEPrice = require("./lib/getEPrice");
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
      break;
    case decodedLink.includes("sogi"):
      var content = await getSogi(decodedLink);
      res.json({ decodedLink, content });
    case decodedLink.includes("ctee"):
      var content = await getCtee(decodedLink);
      res.json({ decodedLink, content });
    case decodedLink.includes("eprice"):
      var content = await getEPrice(decodedLink)
      res.json({ decodedLink, content });

    default:
      console.log(`Default`);
  }
});

app.listen(port, () => {
  console.log(`JQuotes listening on port ${port}`);
});
