import bodyParser from "body-parser";
import express from "express";
import { Models } from "./model/model.index";
import { ApplicationRouter } from "./route/application.router";
import { ClientRouter } from "./route/client.router";
import { sequelize } from "./util/sequelize";
const app = express();
const port = 8080; // default port to listen

(async () => {
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });

  await sequelize.addModels(Models);
  await sequelize.sync();

  app.use(bodyParser.json({ limit: "20mb" })); /* {limit: "20mb"} */
  app.use("/application", ApplicationRouter);
  app.use("/client", ClientRouter);
  app.get("/healthz", async (req, res) => {
    res.send('I am happy and healthy!\n');
  });
  // define a route handler for the default home page
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });
  // start the Express server
})();











