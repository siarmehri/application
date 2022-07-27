import bodyParser from "body-parser";
import express from "express";
import { Models } from "./model/model.index";
import { ApplicationRouter } from "./route/application.router";
import { sequelize } from "./util/sequelize";
import {MongoosClass} from "./util/MongoDB"
const app = express();
const port = 8080; // default port to listen

(async () => {
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
  
  await MongoosClass.StoreDraftApplication();
  //await sequelize.addModels(Models);
  //await sequelize.sync({force: true});

  app.use(bodyParser.json({ limit: "20mb" })); /* {limit: "20mb"} */
  app.use("/application", ApplicationRouter)
  app.get("/healthz", async (req, res) => {
    res.send('I am happy and healthy!\n');
  });
  // define a route handler for the default home page
  app.get("/", (req, res) => {
    res.send("Hello");
  });
  // start the Express server
})();











