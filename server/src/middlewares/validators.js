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

module.exports.validateContestCreation = async (req, res, next) => {
  try {
    const promiseArray = req.body.contests.map(async (el, index) => {
      const isValid = await contestScheme.isValid(el);
      return { isValid, index, data: el };
    });

    const results = await Promise.all(promiseArray);

    for (const result of results) {
      if (!result.isValid) {
        console.log(`Validation error at index ${result.index}:`, result.data);
        return next(createError(400, 'Bad request: validation error!'));
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
