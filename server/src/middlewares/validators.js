const createError = require('http-errors');
const {
  registrationSchema,
  loginSchema,
  contestSchema,
} = require('../utils/validationSchemes');

module.exports.validateRegistrationData = async (req, res, next) => {
  const validationResult = await registrationSchema.isValid(req.body);
  if (!validationResult) {
    next(createError(400, 'Invalid data for registration'));
  } else {
    next();
  }
};

module.exports.validateLogin = async (req, res, next) => {
  const validationResult = await loginSchema.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    next(createError(400, 'Invalid data for login'));
  }
};

module.exports.validateContestCreation = (req, res, next) => {
  const promiseArray = [];
  req.body.contests.forEach((el) => {
    promiseArray.push(contestSchema.isValid(el));
  });
  return Promise.all(promiseArray)
    .then((results) => {
      results.forEach((result) => {
        if (!result) {
          next(createError(400, 'bad request'));
        }
      });
      next();
    })
    .catch((error) => {
      next(createError(500, error));
    });
};
