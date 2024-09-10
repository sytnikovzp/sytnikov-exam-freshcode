/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
// =============================================
const constants = require('../../../constants');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'Creator',
          last_name: 'Test',
          display_name: 'CreatorTest',
          email: 'creator@gmail.com',
          password: await bcrypt.hash('Qwerty123', constants.AUTH.SALT_ROUNDS),
          role: 'creator',
        },
        {
          first_name: 'Customer',
          last_name: 'Test',
          display_name: 'CustomerTest',
          email: 'customer@gmail.com',
          password: await bcrypt.hash('Qwerty123', constants.AUTH.SALT_ROUNDS),
          role: 'customer',
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
