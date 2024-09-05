module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ratings', {
      offerId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'offers',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      mark: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('ratings');
  },
};
