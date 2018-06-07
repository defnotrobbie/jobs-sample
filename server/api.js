const MAX_SIZE = 2200000;
const router = require("express").Router();
require("express-async-errors");

import fetch from "isomorphic-fetch";
import config from "../config/config";
import validate from "./validate";
import multer from "multer";
import fs from "fs";
const storage = require("multer").storage;
const upload = multer({ storage: storage, limits: { fileSize: MAX_SIZE } });
import request from "request";
import regeneratorRuntime from "regenerator-runtime";

const DOC_TYPES =
  "application/pdf,application/msword,text/plain,text/html," +
  "application/rtf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const getJson = (url, res) =>
  fetch(url)
    .then(response => response.json())
    .then(json => res.json(json))
    .catch(error => {
      console.error(error);
      res.json(error);
    });

const post = (url, payload, res) => {
  payload = JSON.stringify(payload);
  fetch(url, {
    method: "POST",
    body: payload,
    headers: {
      "content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
      return res.json(json);
    })
    .catch(error => {
      console.error(error);
      res.json(error);
    });
};
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else return res.sendStatus(401);
  // else res.redirect("/");
};
router.use(ensureAuth);

router.get("/text", (req, res) => {
  // const TEXT = require("./textConstants");
  const textFile = fs.readFileSync(__dirname + "/textConstants.json", "utf8");
  const TEXT = JSON.parse(textFile);
  res.json(TEXT);
});

//get all applications available to user
//combine with any completed or in progress applications
router.get("/application", async (req, res) => {
  const userType = JSON.stringify(req.session.userType);
  const res1 = await fetch(
    `${config.apiHost}/application?userType=${userType}`
  ).catch(error => console.error(error));
  const res2 = await fetch(
    `${config.apiHost}/applicant/${req.user.id}/application`
  ).catch(error => console.error(error));
  let apps,
  userApps = undefined;
  apps = await res1.json();
  userApps = await res2.json();
  res.json({ apps, userApps });
});

//save application
router.put("/application/:id", async (req, res) => {
  const app = await getApp(req);
  const fname = req.user.fname;
  const lname = req.user.lname;
  if (app.userAppData && app.userAppData.COMPLETED)
    return res
      .status(409)
      .json({ submissionError: "Application Already Submitted" });

  post(
    `${config.apiHost}/applicant/${req.user.id}/response/${req.params.id}`,
    {form:req.body,fname,lname},
    res
  );
});

//submit resume
router.post(
  "/application/:id/resume",
  upload.single("resume"),
  async (req, res, next) => {
    const url = `${config.apiHost}/applicant/${req.user.id}/response/${
      req.params.id
    }/resume`;

    if (!DOC_TYPES.includes(req.file.mimetype)) return res.sendStatus(415);

    let formData = {
      resume: {
        value: req.file.buffer,
        options: {
          contentType: req.file.mimetype,
          filename: req.file.originalname
        }
      }
    };
    request
      .post({ url: url, formData }, function(err, response, body) {
        res.send(body);
      })
      .on("error", function(err) {
        console.error("err");
      });
  }
);

//submit application
router.post("/application/:id", async (req, res) => {
  const app = await getApp(req);
  if (app.error !== undefined) return res.sendStatus(app.error);
  if (app.userAppData && app.userAppData.COMPLETED)
    return res
      .status(409)
      .json({ submissionError: "Application Already Submitted" });
  const valid = validate(app, req.body);
  if (valid)
    post(
      `${config.apiHost}/applicant/${req.user.id}/response/${
        req.params.id
      }?complete=1`,
      req.body,
      res
    );
  else
    res.status(400).json({ error: "All required questions must be answered" });
});

router.get("/application/:id", async (req, res) => {
  const payload = await getApp(req);
  if (payload.error !== undefined) return res.sendStatus(payload.error);
  res.json(payload);
});

// router.get("/:user/applications", (req, res) => {
//   getJson(`${config.apiHost}/${req.params.user}/applications`, res);
// });

//get specified application
async function getApp(req) {
  const res1 = await fetch(
    `${config.apiHost}/application/${req.params.id}/form`
  ).catch(error => console.error(error));
  const res2 = await fetch(
    `${config.apiHost}/applicant/${req.user.id}/response/${req.params.id}`
  ).catch(error => console.error(error));
  if (res1.status >= 400) return { error: res1.status };
  if (res2.status >= 400) return { error: res2.status };
  let form,
    userAppData = undefined;
  form = await res1.json().catch(error => console.error(error));
  userAppData = await res2.json().catch(error => console.error(error));
  userAppData = userAppData[0];
  return { ...form, userAppData };
}

module.exports = router;
