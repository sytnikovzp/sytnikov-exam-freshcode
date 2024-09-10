/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ratings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      offer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'offers',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
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
