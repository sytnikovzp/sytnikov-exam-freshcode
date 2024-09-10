/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('offers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      contest_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'contests',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      text: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      original_file_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'pending',
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
  },
  async down(queryInterface) {
    await queryInterface.dropTable('offers');
  },
};
