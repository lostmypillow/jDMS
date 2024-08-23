var express = require("express");
var router = express.Router();
const scrapeContent = require("../lib/scrapeContent");

//

router.post("/", async function (req, res) {
  const resuts = [];
  let queue = req.body.link.split("\n");
  console.log(queue);
  for (const item of queue) {
    const result = await scrapeContent(item);
    resuts.push(result);
  }
  console.log(resuts);

  res.render("result", { results: resuts });
  // res.send("ok");
});

module.exports = router;
