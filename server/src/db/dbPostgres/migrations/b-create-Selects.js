module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('selects', {
      type: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      describe: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('selects');
  },
};
