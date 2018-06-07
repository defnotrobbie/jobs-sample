require("babel-polyfill");
require("@babel/register");
var server = require("./server/server.js");
if (process.env.LOCAL)
  var apiServer = require("./server/apiServer.js");
