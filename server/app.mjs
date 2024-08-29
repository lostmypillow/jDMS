import compression from "compression";
import express from "express";
import cookieParser from "cookie-parser";
import createDebug from "debug";
import http from "http";
import logger from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
import open from "open"; // Uncomment if using 'open'

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
    open(`http://localhost:${port}`);
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
    category: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "NewsContent", // We need to choose the model name
  } 
);
app.get("/get", async function (req, res) {
  await NewsContent.sync();
  res.json(
    req.query.id
      ? await NewsContent.findByPk(req.query.id)
      : await NewsContent.findAll()
  );
});
app.get("/flush", async function (req, res) {
  await NewsContent.sync({ force: true });
  res.send("ok")
});
// app.post("/scrape", async function (req, res) {
//   // await NewsContent.sync();

//   await NewsContent.sync({ force: true });
//   for (const link of req.body) {
//     if (!(await NewsContent.findOne({ where: { link: link } }))) {
//       const result = await scrapeContent(link);
//       NewsContent.create({
//         ...result,
//         content: JSON.stringify(result.content),
//       });
//     }
//   }

//   res.json(await NewsContent.findAll());
// });

//expects ["link", "link"] or "link"
app.post("/update", async function (req, res) {
  // await NewsContent.sync();
  await NewsContent.sync({ force: true });
  for (const link of Array.isArray(req.body.link)
    ? req.body.link
    : [req.body.link]) {
    const [newscont, created] = await NewsContent.findOrCreate({
      where: { link: link },
      defaults: await scrapeContent(link),
    });
    !created && !isBodyAnArray ? await newscont.update(req.body) : null;
  }
 
  res.json(await NewsContent.findAll());
});

export default app;

// Uncomment if you need to handle 404 errors
// .use((req, res, next) => {
//   next(createError(404));
// });
