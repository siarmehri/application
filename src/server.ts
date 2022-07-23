import bodyParser from "body-parser";
import express from "express";
import { ApplicationRouter } from "./route/application.router";
const app = express();
const port = 8080; // default port to listen

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

app.use(bodyParser.json({ limit: "20mb" })); /* {limit: "20mb"} */

app.use("/application", ApplicationRouter)

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// start the Express server
