import compression from "compression";
import express from "express";
import cookieParser from "cookie-parser";
import createDebug from "debug";
import http from "http";
import logger from "morgan";
import cors from "cors";
import path from "path";
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

import * as fs from "fs";
import { getHTML } from "./lib/getHTML.mjs";
import sequelize from "./config/database.mjs";

app.get("/get/:category/:id", async function (req, res) {
  await sequelize.sync();
  let allContent;
  const whichCategoryObject = req.params.category;
  switch (true) {
    case whichCategoryObject == "qualcomm":
      allContent = req.query.id > 0
        ? await QualcommNews.findByPk(req.query.id)
        : await QualcommNews.findAll();
      break;
    case whichCategoryObject == "mediatek":
      allContent = req.query.id
        ? await MediaTekNews.findByPk(req.query.id)
        : await MediaTekNews.findAll();
      break;

    case whichCategoryObject == "commu":
      allContent = req.query.id
        ? await CommuNews.findByPk(req.query.id)
        : await CommuNews.findAll();
      break;
    case whichCategoryObject == "phone":
      allContent = req.query.id
        ? await PhoneNews.findByPk(req.query.id)
        : await PhoneNews.findAll();
      break;
    case whichCategoryObject == "other":
      allContent = req.query.id
        ? await OtherNews.findByPk(req.query.id)
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
  await QualcommNews.bulkCreate(QualcommNewsArray);
  await MediaTekNews.bulkCreate(MediaTekNewsArray);
  await CommuNews.bulkCreate(CommuNewsArray);
  await PhoneNews.bulkCreate(PhoneNewsArray);
  await OtherNews.bulkCreate(OtherNewsArray);
  // res.json({ message: `Imported ${bulkNews.length} objects` });
  res.json(QualcommNewsArray);
});

app.post("/update", async function (req, res) {
  const editID = req.query.id;
  await NewsContent.update(req.body, {
    where: {
      id: editID,
    },
  });
});

// update/qualcomm/1/title
app.post("/update/:category/:id/:field", async function (req, res) {
  const whichCategoryObject = req.params.category;
  const whichID = req.params.id;
  const whichField = req.params.field;
  if (whichField == "category") {
    // change category
  } else {
    switch (true) {
      case whichCategoryObject == "qualcomm":
        await QualcommNews.update(req.body, {
          where: {
            id: whichID,
          },
        });
        break;
      case whichCategoryObject == "mediatek":
        await MediaTekNews.update(req.body, {
          where: {
            id: whichID,
          },
        });
        break;

      case whichCategoryObject == "commu":
        await CommuNews.update(req.body, {
          where: {
            id: whichID,
          },
        });
        break;
      case whichCategoryObject == "phone":
        await PhoneNews.update(req.body, {
          where: {
            id: whichID,
          },
        });
        break;
      case whichCategoryObject == "other":
        await OtherNews.update(req.body, {
          where: {
            id: whichID,
          },
        });
        break;
    }
  }

  await NewsContent.update(req.body, {
    where: {
      id: whichID,
    },
  });
});
// https://www.cool3c.com/article/222688
// https://3c.ltn.com.tw/news/59270
export default app;
