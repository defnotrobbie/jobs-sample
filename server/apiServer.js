import express from "express";
import path from "path";
import compression from "compression";

import bodyParser from "body-parser";
import open from "open";
import fs from "fs";
import multer from "multer";
const upload = multer();
import config from "../config/config";
/* eslint-disable no-console */
import { apps, userApps, appform16, appform17, userapp16 } from "./sampleData";
const port = 4041;
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(compression());

//get apps for this user type
app.get("/api/application", (req, res) => {
  res.json(apps);
});
//get apps for this user
app.get("/api/applicant/:userID/application", (req, res) => {
  res.json(userApps);
});
//save app
app.post("/api/applicant/:userID/response/:responseID", (req, res) => {
  res.json({ request: req.body, STATUS: "ok" });
});
//save file attachment
app.post("/api/applicant/:userID/response/:responseID/resume", (req, res) => {
  res.json({ request: req.body, STATUS: "ok" });
});
//submit app
app.post("/api/applicant/:userID/response/:responseID?complete=1", (req, res) => {
  //do nothing
  res.json({ response: [] });
});
//get app form
app.get("/api/application/:responseID/form", (req, res) => {
  if (req.params.responseID == "16") res.json(appform16);
  else if (req.params.responseID == "17") res.json(appform17);
});
//get app data
app.get("/api/applicant/:userID/response/:responseID", (req, res) => {
  res.json(userapp16);
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("API Server running");
  }
});
