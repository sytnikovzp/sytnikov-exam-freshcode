const createError = require('http-errors');
// =============================================
const {
  registrationScheme,
  loginScheme,
  contestScheme,
} = require('../utils/validationSchemes');

module.exports.validateRegistrationData = async (req, res, next) => {
  const validationResult = await registrationScheme.isValid(req.body);
  if (!validationResult) {
    next(createError(400, 'Invalid data for registration!'));
  } else {
    next();
  }
};

module.exports.validateLogin = async (req, res, next) => {
  const validationResult = await loginScheme.isValid(req.body);
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
      contestScheme.isValid(el).then((isValid) => ({
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
          console.log(
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
