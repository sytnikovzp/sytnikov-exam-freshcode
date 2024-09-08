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
    next(createError(400, 'Invalid data for login!'));
  }
};

module.exports.validateContestCreation = (req, res, next) => {
  const promiseArray = [];
  req.body.contests.forEach((el, index) => {
    promiseArray.push(
      contestSchema.isValid(el).then((isValid) => ({
        isValid,
        index,
        data: el,
      }))
    );
  });

  return Promise.all(promiseArray)
    .then((results) => {
      results.forEach((result) => {
        if (!result.isValid) {
          console.error(
            `Validation error at index ${result.index}:`,
            result.data
          );
          next(createError(400, 'Bad request: validation error!'));
        }
      });
      next();
    })
    .catch((error) => {
      next(error);
    });
};
