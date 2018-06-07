const router = require("express").Router();
const passport = require("passport");
const saml = require("passport-saml").Strategy;
const shib = require("./shibbolethStrategy");
const apiHost = require("../config/config").apiHost;
const fetch = require("isomorphic-fetch");

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(
  new saml(shib.strategy, (profile, done) => done(null, shib.userMeta(profile)))
);
router.use(passport.initialize());
router.use(passport.session());

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else return res.sendStatus(401);
  // else res.redirect("/login");
};

router.post(
  "/callback",
  passport.authenticate("saml", {
    failureRedirect: "/login/fail"
  }),
  // staffCheck
  (req, res) => {
    if (req.session.referer) return res.redirect(req.session.referer);
    res.redirect("/");
  }
);

router.use("/login", (req, res, next) => {
  req.session.referer = req.headers["referer"];
  next();
});

router.get(
  "/login",
  passport.authenticate("saml", {
    failureRedirect: "/login/fail"
  }),
  (req, res) => {}
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect(shib.logout);
});

router.get("/login/fail", (req, res) => {
  res.status(401).send("Login failed");
});

router.get("/profile", (req, res) => {
  if (req.user && req.user.pennkey) {
    fetch(`${apiHost}/applicant/${req.user.id}`)
      .then(response => response.json())
      .then(json => {
        req.session.userType = json.userType;
        res.json({ ...json, ...req.user });
      })
      .catch(error => {
        console.error(error);
        res.json(error);
      });
  } else return res.sendStatus(401);
});

module.exports = router;
