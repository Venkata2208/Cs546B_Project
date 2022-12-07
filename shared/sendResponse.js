/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} statusCode
 * @param {*} data
 */
module.exports = function (req, res, next, statusCode, data = {}) {
  if (typeof data == "string") {
    data = {
      message: data,
    };
  }

  const response = {
    data: data,
  };

  response.status = createStatusObject(statusCode);

  return res.status(statusCode).send(response);
};

function createStatusObject(statusCode) {
  const status = {};

  switch (statusCode) {
    case 299:
      status.type = "warning";
      break;

    case 200:
    case 201:
      status.type = "success";
      break;

    case 301:
      status.type = "info";
      break;

    case 400:
    case 403:
    case 500:
      status.type = "error";
      break;
  }

  status.code = statusCode;

  return status;
}
