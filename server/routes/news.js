var express = require("express");
var router = express.Router();
const scrapeContent = require("../lib/scrapeContent");
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

class NewsContent extends Model {
  static classLevelMethod() {
    return "foo";
  }
  instanceLevelMethod() {
    return "bar";
  }
  getFullname() {
    return [this.firstname, this.lastname].join(" ");
  }
}
NewsContent.init(
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING
    },
    dateSourceAuthor: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    }

  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "NewsContent", // We need to choose the model name
  }
);

router.post("/scrape", async function (req, res) {
  const results = [];
  for (const link of req.body.link.split("\n")) {
    results.push(await scrapeContent(link));
  }
  res.render("result", { results: results });
});

router.post("/create", async function (req, res) {
  await NewsContent.sync()
  // await NewsContent.sync({force: true})
  NewsContent.create({title: "meow", dateSourceAuthor: "meow", content: "meow"})
  res.json(await NewsContent.findAll());
});


router.get("/find", async function (req, res) {
  const meowAll = await NewsContent.findAll({
    where: {
      title: "meow",
    }
  })
  res.json(meowAll)
})

router.post("/update", async function (req, res) {
  const changeMeow = await NewsContent.findOne({
    where: {
      title: "meow",
    }
  })
  changeMeow.update({title :"nomeow"})
  res.json(await NewsContent.findAll())
})

module.exports = router;
