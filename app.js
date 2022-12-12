const express = require("express");
const app = express();
const routes = require("./routes");
const init = require("./shared/init");
const logging = require("./middlewares/logging");
const { isAuthenticated } = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");
const static = express.static(__dirname + "/public");

app.use("/public", static);

init(app);
app.use(logging);
app.use(isAuthenticated);
routes(app);
app.use(errorHandler);

process.on("uncaughtException", (ex) => {
  console.log(ex);
});

process.on("unhandledRejection", (ex) => {
  console.log(ex);
});

app.listen(3000, async () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
