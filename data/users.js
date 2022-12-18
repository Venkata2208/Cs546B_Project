const Users = require("../models/users");
const validator = require("../validators/users");
const ServerError = require("../shared/server-error");
const bcrypt = require("bcrypt");
const sendResponse = require("../shared/sendResponse");
const { isValidObjectId: isObjectId } = require("mongoose");
const xss = require('../shared/xssHelper');
const salt = 10;

module.exports = {
  getLoginPage,
  getSignUpPage,
  login,
  signUp,
  getUser,
  logout
};

async function getLoginPage(req, res, next) {
  try {
    return res.render("users/login", { isNotLoggedIn: true });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function getSignUpPage(req, res, next) {
  try {
    return res.render("users/signup", { isNotLoggedIn: true });
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function getUser(req, res, next) {
  try {
    const userId = req.params.id;
    if (!isObjectId(userId)) throw "userID is not a valid object id";

    const user = await Users.findOne({ '_id': userId }).lean();

    if (!user) throw new ServerError(400, "User does not exists with given user id");

    return sendResponse(res, 200, user);
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function login(req, res, next) {
  try {
    const reqBody = xss(req.body);

    const { error } = validator.validateUserLogin(reqBody);
    if (error) {
      throw new ServerError(400, error.message);
    }

    const username = reqBody.username;
    const password = reqBody.password;

    const user = await Users.findOne({
      username: username.toLowerCase(),
    });

    if (!user) {
      throw new ServerError(400, 'Username or password Incorrect!');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ServerError(400, 'Username or password Incorrect!');
    }

    user.firstName = user.firstName.trim();
    user.lastName = user.lastName.trim();

    req.session.user = {
      id: user.id,
    };

    return sendResponse(res, 200, user);
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function logout(req, res, next) {
  try {
    req.session.destroy();
    return res.redirect("/");
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
}

async function signUp(req, res, next) {
  try {
    const reqBody = xss(req.body);

    const { error } = validator.validateUserSignUp(requestBody);
    if (error) {
      throw new ServerError(400, error.message);
    }

    const username = requestBody.username.toLowerCase();

    const user = await Users.findOne({ username: username });

    if (user) throw new ServerError(400, "User already exists with given username");

    const password = await bcrypt.hash(requestBody.password, salt);

    const response = await Users.create({
      firstName: requestBody.firstName,
      lastName: requestBody.lastName,
      name: `${requestBody.firstName} ${requestBody.lastName}`,
      username: username,
      password: password,
    });

    return sendResponse(res, 200, response);
  } catch (error) {
    if (error instanceof ServerError) {
      return next(error);
    }
    return next(new ServerError(500, error.message));
  }
};
