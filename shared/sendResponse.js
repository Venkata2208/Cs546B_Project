/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} statusCode
 * @param {*} data
 */
module.exports = function (res, statusCode, data = {}) {
  const response = {
    data: data,
  };

  return res.status(statusCode).send(response);
};
