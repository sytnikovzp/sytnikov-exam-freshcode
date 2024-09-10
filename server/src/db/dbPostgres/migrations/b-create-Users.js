/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      display_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      access_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      role: {
        type: Sequelize.ENUM('customer', 'creator'),
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
      rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
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

    await queryInterface.addConstraint('users', {
      name: 'users_balance_check',
      type: 'check',
      fields: ['balance'],
      where: {
        balance: {
          [Sequelize.Op.gte]: 0,
        },
      },
    });

    await queryInterface.sequelize.query(
      'UPDATE users SET email = LOWER(email);'
    );
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('users', 'users_balance_check');

    await queryInterface.dropTable('users');
  },
};
