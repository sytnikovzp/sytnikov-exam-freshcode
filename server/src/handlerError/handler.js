// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (
    err.message ===
      'new row for relation "Cards" violates check constraint "Banks_balance_ck"' ||
    err.message ===
      'new row for relation "Users" violates check constraint "Users_balance_ck"'
  ) {
    return res.status(406).send('Not Enough money!');
  }

  const statusCode = err.status || 500;
  const message = err.message || 'Server Error';

  res.status(statusCode).send(message);
};
