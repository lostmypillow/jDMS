var express = require("express");
var router = express.Router();
const scrapeContent = require("../lib/scrapeContent");
const { Sequelize, DataTypes, Model } = require("sequelize");
const predictCategory = require("../lib/predictCategory");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});
const fs = require("fs");
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
      type: DataTypes.STRING,
    },
    date_source_author: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "NewsContent", // We need to choose the model name
  }
);

router.post("/scrape", async function (req, res) {
  await NewsContent.sync({force: true})
  for (const link of req.body) {
    const result = await scrapeContent(link);
    NewsContent.create({
      title: result.title,
      date_source_author: result.date_source_author,
      link: result.link,
      content: JSON.stringify(result.content),
    });
  }
  // res.render("result", { results: await NewsContent.findAll() });
  res.json(await NewsContent.findAll())
  // console.log(req.body)
  // res.send("ok")
});

router.post("/create", async function (req, res) {
  await NewsContent.sync();
  // await NewsContent.sync({force: true})
  NewsContent.create({
    title: "meow",
    dateSourceAuthor: "meow",
    content: "meow",
  });
  res.json(await NewsContent.findAll());
});

router.get("/find", async function (req, res) {
  const meowAll = await NewsContent.findAll({
    where: {
      title: "meow",
    },
  });
  res.json(meowAll);
});

router.post("/update", async function (req, res) {
  const changeMeow = await NewsContent.findOne({
    where: {
      title: "meow",
    },
  });
  changeMeow.update({ title: "nomeow" });
  res.json(await NewsContent.findAll());
});

router.get("/predict", async function (req, res) {
  const headline = "文曄科技於2024台北國際自動化工業展出聯發科智慧物聯網平台Genio系列";
  console.log(predictCategory(headline));
  res.send("ok");
});

router.get("/train", function (req, res) {
  // const data = req.body.train;
  const text = `
Qualcomm相關新聞

高通力拚AI PC市場，IFA 2024 發表更多Snapdragon X體驗

高通CEO今年親征IFA展 平價版8核心Snapdragon X平台將亮相

高通執行長Cristiano Amon將於IFA舉辦Snapdragon X系列主題演講，分享如何擴展Snapdragon X系列與持續創新

高通公司總裁暨執行長Cristiano Amon將舉行記者會，為更多使用者帶來突破性運算體驗

MediaTek相關新聞

聯發科達哥再下一城AI軟硬通吃

文曄科技於2024台北國際自動化工業展出聯發科智慧物聯網平台Genio系列

搶攻邊緣AI商機 研華攜手聯發科擘劃Everyday AI策略

發展Everyday AI策略 研華導入聯發科「發哥」生成式AI平台

無線通訊市場

RF元件／主晶片設計有解Wi-Fi 7實際效能定輸贏

智慧型手機/消費性電子產品

中華電加入銷售戰局Google Pixel 9系列預購開紅盤

搭載2億畫素潛望式鏡頭？vivo X200 Pro傳沿用X100 Ultra部分規格

其他業界重要訊息

Google預計明年推出的Tensor G5據稱將採用台積電先進的InFO-POP封裝​​以及尖端的3nm製程

Intel在2026年推出的筆電、桌機處理器將採用相同代號名稱「Nova Lake」

Intel Core Ultra 5 245K Arrow Lake桌上型電腦CPU幾乎達到Core i9-13900K單核心效能

ARM開發新GPU挑戰輝達 擴大以色列團隊迎戰AI時

3D DRAM內建AI處理！NEO新技術可取代HBM，解決現有瓶頸

英特爾品牌形象動搖 高通、聯發科把握AI PC超車契機

先進封裝供不應求 半導體展9月洞悉11項前線技術

SEMICON Taiwan即將登場，各40家CoWoS與面板級封裝廠吸睛

SEMICON Taiwan 2024下月登場 揭櫫半導體技術風向球

SEMICON半導體展9／4登場，CoWoS等先進封裝技術成關注焦點

臺灣不能只有台積電，慶祝AI人工智慧落地應用協會AIAA正式成立

傳軟銀與英特爾代工談判破局 重點放在和台積協商

英特爾晶圓製造自負盈虧 分拆改名鋪路？

AI時代帶動半導體版圖重組！台積電選擇和SK海力士合作，讓三星什麼都輸了

全球環境挑戰大 航太、工具機結合5G轉型

Qualcomm相關新聞

高通推出Snapdragon 7s Gen 3 為中階智慧型手機注入強大AI能力

中階手機迎來生成式AI 高通推Snapdragon 7s Gen3晶片

台積電N4P製程加持，高通Snapdragon 7s Gen 3搶攻中階市場

高通Snapdragon 7s Gen 3問世，小米新機將率先採用

MediaTek相關新聞

擷發AI軟體平台解決方案 獲文曄採用

擷發科技「AI軟體平台解決方案」 獲文曄科技採用

首款基於聯發科Genio IoT平台上陣 文曄搶用

AI模型客製化！擷發科技「AI軟體平台解決方案」 獲文曄採用

無線通訊市場

毫米波技術 高頻訊號傳輸利器

智慧型手機/消費性電子產品

英特爾攜手夥伴推出最新商用AI PC 助企業釋放AI潛力

Intel攜手系統商、軟體商展現vPro商用AI PC的效益，強調透過AI能使商用PC更具生產力

英特爾揪台鏈攻商用 AI PC 打造開放生態系

Intel說明AI PC與vPro平台功能，強化商務應用生產力

英特爾攜手台鏈 秀商用AI PC和最新應用

Intel攜手多家業者展示多款結合Intel vPro技術的商用AI PC產品，提供自動生成式API資源讓企業內部開發者能更容易打造對應邊緣運算應用的人工智慧服務

英特爾攜手生態系合作夥伴 加速部署商用AI PC平台

英特爾攜手生態系合作夥伴推出最新商用AI PC裝置與應用

AI PC出貨熱 英特爾喊今年出貨4千萬台裝置

不用1萬5也能入手SAMSUNG Galaxy S23旗艦手機！通路最低價格一次看

挑機看指標：2024年7月台灣銷售最好的二十款智慧型手機排行

最實用的AI PC不是Copilot+ PC，是電競PC

其他業界重要訊息

神盾爭AI伺服器晶片大餅

韓國最大AI獨角獸誕生！韓媒憂三星代工版圖消長「最終選台積電」

全球晶圓代工第二季季增9%，台積電依舊領先群雄

超微 台南、高雄設研發據點

經濟部證實 超微研發據點選定台南高雄

SEMI矽光子產業聯盟成立 台積、日月光、聯發科、鴻海等攜手建構生態系

NVIDIA攜手聯發科，G-SYNC技術不再需要專用硬體模組
`;

  // Split the text by newline and remove empty lines
  const lines = text
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "");

  // Initialize variables
  let newArray = [];
  // Loop through each line
  let categoryToUpdate;
  lines.forEach((line) => {
    if (line.match(/相關新聞$|無線通訊市場$|消費性電子產品$|訊息$/)) {
      categoryToUpdate = line;
      console.log(categoryToUpdate);
    } else {
      newArray.push({
        headline: line.replace(/ /g, ""),
        category: categoryToUpdate,
      });
      console.log(newArray);
    }
  });
  console.log(__dirname)
  let g = __dirname + "/data.json"
  fs.writeFile(
    g,
    JSON.stringify(newArray, null, 2),
    (err) => {
      if (err) throw err;
      console.log("Data saved to data.json");
    }
  );
  predictCategory()
  res.send("ok");
});

module.exports = router;
