const users = require("./users");
const matches = require('./matches');

const constructorMethod = (app) => {
  app.use("/users", users);
  app.use("/matches", matches);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
