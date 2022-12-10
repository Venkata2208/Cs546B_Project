const express = require("express");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const mongoInit = require("../shared/mongoConnection");
const session = require("express-session");
const cors = require("cors");

/**
 *
 * @param {*} app
 */
module.exports = function init(app) {
  mongoInit();
  app.use(cors());
  const handlebarsInstance = exphbs.create({
    defaultLayout: "main",
    helpers: {
      asJSON: (obj, spacing) => {
        if (typeof spacing === "number")
          return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

        return new Handlebars.SafeString(JSON.stringify(obj));
      },
    },
  });

  const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }

    // let the next middleware run:
    next();
  };

  app.use(
    session({
      name: "AuthCookie",
      secret: "8QnC5j7fFT",
      saveUninitialized: true,
      resave: false,
      cookie: { maxAge: 600000 },
    })
  );

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(rewriteUnsupportedBrowserMethods);

  app.engine("handlebars", handlebarsInstance.engine);
  app.set("view engine", "handlebars");
};
