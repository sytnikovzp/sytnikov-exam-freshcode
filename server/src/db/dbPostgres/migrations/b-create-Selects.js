module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('selects', {
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      describe: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('selects', {
      fields: ['type', 'describe'],
      type: 'primary key',
      name: 'selects_pkey',
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('selects');
  },
};
