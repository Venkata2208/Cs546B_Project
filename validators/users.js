const Joi = require("joi");
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

module.exports = {
  validateUserSignUp,
  validateUserLogin,
  validateEditUser,
};

/**
 *
 * @param {*} requestBody
 * @return {*} Validate Object
 */

function validateUserSignUp(requestBody) {
  const schema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(20).required(),
    lastName: Joi.string().alphanum().min(1).max(20).required(),
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().regex(passwordRegex).required(),
  });
  return schema.validate(requestBody);
}

function validateUserLogin(Username, password) {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().regex(passwordRegex).required(),
  });
  return schema.validate(Username, password);
}
function validateEditUser(requestBody) {
  const schema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(20).required(),
    lastName: Joi.string().alphanum().min(1).max(20).required(),
    password: Joi.string().required(),
  });
  return schema.validate(requestBody);
}
