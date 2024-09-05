/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ratings', {
      offer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'offers',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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

    await queryInterface.addConstraint('ratings', {
      fields: ['offer_id', 'user_id'],
      type: 'primary key',
      name: 'ratings_pkey',
    });

    await queryInterface.addConstraint('ratings', {
      name: 'check_mark_between_0_and_5',
      type: 'check',
      fields: ['mark'],
      where: {
        mark: {
          [Sequelize.Op.between]: [0, 5],
        },
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'ratings',
      'check_mark_between_0_and_5'
    );

    await queryInterface.dropTable('ratings');
  },
};
