const fs = require("fs");
const capitalize = require("lodash").capitalize;
const config = require("../config/config");
const host = config.appHost;

exports.strategy = {
  callbackUrl: host + "/callback",
  entryPoint: "https://idp.pennkey.upenn.edu/idp/profile/SAML2/Redirect/SSO",
  issuer: host + "/shibboleth",
  privateCert: fs.readFileSync(__dirname + "/certs/sp-key.pem", "utf8"),
  signatureAlgorithm: "sha1",
  protocol: "https://",
  disableRequestedAuthnContext: true,
  identifierFormat: null,
  forceAuthn: false
};
exports.logout = "https://weblogin.pennkey.upenn.edu/logout"
/**
 * Created by schleind on 8/30/16.
 * FROM https://gitlab.com/upenn-cloud-first/afs41/blob/master/server/auth/saml/passport.js
 */
exports.userMeta = function(profile) {
  const _fname = profile["urn:oid:2.5.4.42"];
  const _lname = profile["urn:oid:2.5.4.4"];
  const _pennEmail = profile["urn:oid:0.9.2342.19200300.100.1.3"]; // this is user supplied and potentially false/dangerous
  const _eppn = profile["urn:oid:1.3.6.1.4.1.5923.1.1.1.6"];
  const _entitlementsArray = profile["urn:oid:1.3.6.1.4.1.5923.1.1.1.7"];

  const _affiliations = profile["urn:oid:1.3.6.1.4.1.5923.1.1.1.9"];
  const _pennId = profile["urn:oid:2.16.840.1.113730.3.1.3"]; // referred to as 'employeeNumber' in SAML/Shib specs
  const _pennKey = _eppn ? _eppn.split("@")[0] : null;

  const userMeta = {
    // this data is put in Session in Node/Express:  req.session.userMeta
    eppn: _eppn,
    fname: capitalize(_fname),
    lname: capitalize(_lname),
    id: _pennId,
    pennkey: _pennKey,
    pennEmail: _pennEmail,
    email: profile.email
  };
  return userMeta;
};
