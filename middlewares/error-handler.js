const ServerError = require("../shared/server-error");

module.exports = async (error, req, res, next) => {
  console.log(error.message);
  if (error instanceof ServerError) {
    const status = error.status;
    const message = error.message;
    if (status == 403) return res.render('users/login', { isNotLoggedIn: true })
    return res.status(status).send({ data: message });
  }

  const status = 500;
  const message = error.message;
  return res.status(status).send({ data: message });
};
