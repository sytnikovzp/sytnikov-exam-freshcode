const ApplicationError = require('./ApplicationError');

class BankDeclineError extends ApplicationError{
  constructor (message) {
    super(message || 'Card decline transaction', 403);
  }
}

module.exports = BankDeclineError;
