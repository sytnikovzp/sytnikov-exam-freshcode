const yup = require('yup');

// ==================== GENERAL ============================
// const STRING_SCHEMA = yup.string();
// const STRING_NULLABLE_SCHEMA = yup.string().nullable();
// const DATE_NULLABLE_SCHENA = yup.date().nullable();
// const BOOLEAN_NULLABLE_SCHEMA = yup.boolean().nullable();

module.exports.paginationScheme = yup.object().shape({
  limit: yup.number().min(1).max(100).required(),
  offset: yup.number().min(0).required(),
});

// ==================== FOR ENTITIES =======================

module.exports.registrationScheme = yup.object().shape({
  firstName: yup.string().required().min(1),
  lastName: yup.string().required().min(1),
  displayName: yup.string().required().min(1),
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
  role: yup
    .string()
    .matches(/(customer|creator)/)
    .required(),
});

module.exports.loginScheme = yup.object().shape({
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
});

module.exports.contestScheme = yup.object().shape({
  contestType: yup
    .string()
    .matches(/(name|logo|tagline)/)
    .required(),
  fileName: yup.string().min(1),
  originalFileName: yup.string().min(1),
  title: yup.string().required().min(1),
  typeOfName: yup.string().min(1),
  industry: yup.string().required().min(1),
  focusOfWork: yup.string().required().min(1),
  targetCustomer: yup.string().required().min(1),
  styleName: yup.string().min(1),
  nameVenture: yup.string().min(1),
  typeOfTagline: yup.string().min(1),
  brandStyle: yup.string().min(1),
});
