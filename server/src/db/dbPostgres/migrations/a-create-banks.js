module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('banks', {
      cardNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cvc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('banks');
  },
};
