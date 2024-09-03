import compression from "compression";
import express from "express";
import cookieParser from "cookie-parser";
import createDebug from "debug";
import http from "http";
import logger from "morgan";
import cors from "cors";
import path from "path";
import * as fs from "fs";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  patchDocument,
  PatchType,
  ExternalHyperlink,
} from "docx";
import { fileURLToPath } from "url";
import {
  QualcommNews,
  MediaTekNews,
  CommuNews,
  PhoneNews,
  OtherNews,
} from "./models/index.mjs";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
import open from "open";

const debug = createDebug("planned-move:server");
const port = normalizePort(process.env.PORT || "3002");
const app = express()
  .use(compression())
  .use(cors())
  .use(logger("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, "public")))

  .use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send("error");
  })
  .set("port", port);

const server = http.createServer(app);

server
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
    // open(`http://localhost:${port}`);
  })
  .on("error", onError)
  .on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
import { scrapeContent } from "./lib/scrapeContent.mjs";

import { Sequelize, DataTypes, Model, Op } from "sequelize";

import { getHTML } from "./lib/getHTML.mjs";
import sequelize from "./config/database.mjs";

app.get("/docx", (req, res) => {
  const content = fs.readFileSync(
    path.resolve(__dirname, "input.docx"),
    "binary"
  );

  // Unzip the content of the file
  const zip = new PizZip(content);

  // This will parse the template, and will throw an error if the template is
  // invalid, for example, if the template is "{user" (no closing tag)
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
  doc.render({
    first_name: "John",
    last_name: "Doe",
    phone: "0652455478",
  });

  // Get the zip document and generate it as a nodebuffer
  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });

  // buf is a nodejs Buffer, you can either write it to a
  // file or res.send it with express for example.
  fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
});

app.get("/get/:category/:id", async function (req, res) {
  await sequelize.sync();
  let allContent;
  const sourceCategory = req.params.category;
  switch (true) {
    case sourceCategory == "qualcomm":
      allContent =
        req.params.id > 0
          ? await QualcommNews.findByPk(req.params.id)
          : await QualcommNews.findAll();
      break;
    case sourceCategory == "mediatek":
      allContent =
        req.params.id > 0
          ? await MediaTekNews.findByPk(req.params.id)
          : await MediaTekNews.findAll();
      break;

    case sourceCategory == "commu":
      allContent =
        req.params.id > 0
          ? await CommuNews.findByPk(req.params.id)
          : await CommuNews.findAll();
      break;
    case sourceCategory == "phone":
      allContent =
        req.params.id > 0
          ? await PhoneNews.findByPk(req.params.id)
          : await PhoneNews.findAll();
      break;
    case sourceCategory == "other":
      allContent =
        req.params.id > 0
          ? await OtherNews.findByPk(req.params.id)
          : await OtherNews.findAll();
      break;
  }

  res.json(allContent);
});

app.get("/flush", async function (req, res) {
  await NewsContent.sync({ force: true });
  res.send("ok");
});

//import accepts an array of links
app.post("/import", async function (req, res) {
  const listofLinks = req.body.links;
  await sequelize.drop();
  await sequelize.sync({ force: true });
  const listOfObj = await scrapeContent(await getHTML(listofLinks));
  // const bulkNews = await NewsContent.bulkCreate();
  function splitByCategory(items) {
    const categories = [
      "Qualcomm相關新聞",
      "MediaTek相關新聞",
      "無線通訊市場",
      "智慧型手機/消費性電子產品",
      "其他業界重要訊息",
    ];

    const result = items.reduce((acc, item) => {
      const category = item.category;

      if (acc[category]) {
        acc[category].push(item);
      } else {
        acc[category] = [item];
      }

      return acc;
    }, {});

    return categories.map((cat) => result[cat] || []);
  }

  const [
    QualcommNewsArray,
    MediaTekNewsArray,
    CommuNewsArray,
    PhoneNewsArray,
    OtherNewsArray,
  ] = splitByCategory(listOfObj);

  for (let i = 0; i < QualcommNewsArray.length; i++) {
    const a = QualcommNewsArray[i].url
      ? await QualcommNews.findOrCreate({
          where: { url: QualcommNewsArray[i].url },
          defaults: QualcommNewsArray[i],
        })
      : "";
  }
  for (let i = 0; i < MediaTekNewsArray.length; i++) {
    const a = MediaTekNewsArray[i].url
      ? await MediaTekNews.findOrCreate({
          where: { url: MediaTekNewsArray[i].url },
          defaults: MediaTekNewsArray[i],
        })
      : "";
  }
  for (let i = 0; i < CommuNewsArray.length; i++) {
    const a = CommuNewsArray[i].url
      ? await CommuNews.findOrCreate({
          where: { url: CommuNewsArray[i].url },
          defaults: CommuNewsArray[i],
        })
      : "";
  }
  for (let i = 0; i < PhoneNewsArray.length; i++) {
    const a = PhoneNewsArray[i].url
      ? await PhoneNews.findOrCreate({
          where: { url: PhoneNewsArray[i].url },
          defaults: PhoneNewsArray[i],
        })
      : "";
  }
  for (let i = 0; i < OtherNewsArray.length; i++) {
    const a = OtherNewsArray[i].url
      ? await OtherNews.findOrCreate({
          where: { url: OtherNewsArray[i].url },
          defaults: OtherNewsArray[i],
        })
      : "";
  }
  // console.log("created Other News in db: ", await OtherNews.findAll())
  res.send("ok");
});

// update/qualcomm/1/
app.post("/update/:category/:id", async function (req, res) {
  const sourceCategory = req.params.category;
  const whichID = req.params.id;
  const targetCategory = req.query.category;
  let response;
  response =
    sourceCategory === "qualcomm"
      ? await QualcommNews.update(req.body, { where: { id: whichID } })
      : sourceCategory === "mediatek"
      ? await MediaTekNews.update(req.body, { where: { id: whichID } })
      : sourceCategory === "commu"
      ? await CommuNews.update(req.body, { where: { id: whichID } })
      : sourceCategory === "phone"
      ? await PhoneNews.update(req.body, { where: { id: whichID } })
      : sourceCategory === "other"
      ? await OtherNews.update(req.body, { where: { id: whichID } })
      : undefined;
  if (targetCategory) {
    // change category
    let Data =
      sourceCategory === "qualcomm"
        ? await QualcommNews.findByPk(whichID)
        : sourceCategory === "mediatek"
        ? await MediaTekNews.findByPk(whichID)
        : sourceCategory === "commu"
        ? await CommuNews.findByPk(whichID)
        : sourceCategory === "phone"
        ? await PhoneNews.findByPk(whichID)
        : sourceCategory === "other"
        ? await OtherNews.findByPk(whichID)
        : undefined;
    let sourceData = Data;
    console.log(sourceData.title);
    let deleteData =
      sourceCategory === "qualcomm"
        ? await QualcommNews.destroy({ where: { id: whichID } })
        : sourceCategory === "mediatek"
        ? await MediaTekNews.destroy({ where: { id: whichID } })
        : sourceCategory === "commu"
        ? await CommuNews.destroy({ where: { id: whichID } })
        : sourceCategory === "phone"
        ? await PhoneNews.destroy({ where: { id: whichID } })
        : sourceCategory === "other"
        ? await OtherNews.destroy({ where: { id: whichID } })
        : undefined;
    console.log(sourceData.title);
    sourceData = {
      title: sourceData.title,
      date_source_author: sourceData.date_source_author,
      link: sourceData.link,
      category: sourceData.category,
      content: sourceData.content,
    };
    let importData =
      targetCategory === "qualcomm"
        ? await QualcommNews.create(sourceData)
        : targetCategory === "mediatek"
        ? await MediaTekNews.create(sourceData)
        : targetCategory === "commu"
        ? await CommuNews.create(sourceData)
        : targetCategory === "phone"
        ? await PhoneNews.create(sourceData)
        : targetCategory === "other"
        ? await OtherNews.create(sourceData)
        : undefined;
  }

  res.json({ status: "ok" });
});

app.post("/delete/:category/:id", async function (req, res) {
  const sourceCategory = req.params.category;
  const whichID = req.params.id;
  const isCat = req.query.category;
  let response;

  if (isCat) {
    // change category
  } else {
    switch (true) {
      case sourceCategory == "qualcomm":
        response = await QualcommNews.destroy({
          where: {
            id: whichID,
          },
        });
        console.log("ok");
        break;
      case sourceCategory == "mediatek":
        response = await MediaTekNews.destroy({
          where: {
            id: whichID,
          },
        });
        break;

      case sourceCategory == "commu":
        response = await CommuNews.destroy({
          where: {
            id: whichID,
          },
        });
        break;
      case sourceCategory == "phone":
        response = await PhoneNews.destroy(body, {
          where: {
            id: whichID,
          },
        });
        break;
      case sourceCategory == "other":
        response = await OtherNews.destroy({
          where: {
            id: whichID,
          },
        });
        break;
    }
  }
  res.json({ status: "ok" });
});
// https://www.cool3c.com/article/222688
// https://3c.ltn.com.tw/news/59270
export default app;
