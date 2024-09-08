/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'cards',
      [
        {
          card_number: '4564654564564564',
          name: 'SquadHelp',
          expiry: '11/26',
          cvc: '453',
          balance: 0,
        },
        {
          card_number: '4111111111111111',
          name: 'Yriy',
          expiry: '09/26',
          cvc: '505',
          balance: 5000,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('cards', null, {});
  },
};
