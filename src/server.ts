import bodyParser from "body-parser";
import express from "express";

import { Models } from "./model/model.index";
import { ApplicationRouter } from "./route/application.router";
import { ClientRouter } from "./route/client.router";
import { FileRouter } from "./route/file.router";
import { CountryRouter } from "./route/country.router";
import {  NationalityRouter} from "./route/nationality.router"
import { sequelize } from "./util/sequelize";
import { umzug } from "./util/umzug";
const app = express();
const port = 8080; // default port to listen

(async () => {
  try {

    sequelize.addModels(Models);
    await umzug.up();
    
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(`There was an error migrating and registering models ${(err as any).message}`);
    process.exit(1);
  }

  app.use(bodyParser.json({ limit: "20mb" })); /* {limit: "20mb"} */

  app.use("/v1/application", ApplicationRouter);
  app.use("/v1/file", FileRouter);
  app.use("/v1/country", CountryRouter);
  app.use("/v1/nationality", NationalityRouter);
  app.use("/v1/client", ClientRouter);
  app.get("/v1/healthz", async (req, res) => {
    res.send('I am happy and healthy!\n');
  });
  // define a route handler for the default home page
  app.get("/", (req, res) => {
    res.send("Hello world!");
  });
  // start the Express server
})();











