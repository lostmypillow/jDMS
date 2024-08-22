var express = require('express');
var router = express.Router();
const scrapeContent = require("../lib/scrapeContent");

// 


router.post('/', async function(req, res) {
    res.render('result', await scrapeContent(req.body.link))
  });


module.exports = router