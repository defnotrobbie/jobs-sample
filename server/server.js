import express from "express";
import webpack from "webpack";
import path from "path";
import fetch from "isomorphic-fetch";
import session from "express-session";
import uuidv4 from "uuid/v4";
// import helmet from "helmet";
import compression from "compression";
// import passport from "passport";
// const saml = require("passport-saml").Strategy;
// import { Strategy as saml } from "passport-saml";
import bodyParser from "body-parser";
import api from "./api";
let authRoute;
// if (!process.env.LOCAL) authRoute = require("./authRoute");
// import authRoute from "./authRoute";
import open from "open";
import fs from "fs";
import multer from "multer";
const upload = multer();
import FormData from "form-data";
import webpackConfig from "../config/webpack";
import config from "../config/config";
/* eslint-disable no-console */

const port = 4040;
const app = express();
const secret = uuidv4();

if (process.env.NODE_ENV === "development" || process.env.LOCAL) {
  const compiler = webpack(webpackConfig);
  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(require("webpack-hot-middleware")(compiler));
}
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(
  session({
    name: `${config.name}.sid`,
    secret: secret,
    // cookie: { sameSite: true, secure: true },
    cookie: {},
    secure: true,
    genid: () => uuidv4(),
    resave: true,
    saveUninitialized: true
  })
);
app.use(compression());
if (process.env.LOCAL) {
  app.use((req, res, next) => {
    req.session.reqs++
    if (req.session.loggedIn) {
      req.user = {
        id: "12345678",
        fname: "Zaphod",
        lname: "Beeblebrox",
        loggedIn: true
      };
      req.isAuthenticated = () => true
    } else {
      req.isAuthenticated = () => false
    }
    next();
  });
  app.get("/login", (req, res) => {
    req.session.loggedIn = true;
    res.send({status:'logged in'})
  });
  
  app.get("/profile", (req, res) => {
    if (req.session.loggedIn)
    res.json(req.user);
    else res.sendStatus(401)
  });
  
  app.get("/logout", (req, res) => {
    req.session.loggedIn = false;
    res.send({status:'logged out'})
  });
} else app.use(authRoute);

app.use("/api", api);

app.get("/session", (req, res) => {
  res.json({
    sess: req.session,
    user: req.user
  });
});
app.use(express.static("public"));
if (process.env.NODE_ENV !== "development") app.use(express.static("build"));
app.get("*", function (req, res) {
  if (process.env.NODE_ENV === "development" || process.env.LOCAL) {
    res.sendFile(path.join(__dirname, "../src/index.html"));
  } else {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  }
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server running");
  }
});