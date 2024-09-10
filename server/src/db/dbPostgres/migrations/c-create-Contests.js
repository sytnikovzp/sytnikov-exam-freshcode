/* eslint-disable camelcase */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contests', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      contest_type: {
        type: Sequelize.ENUM('name', 'tagline', 'logo'),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type_of_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      industry: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      focus_of_work: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      target_customer: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      style_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name_venture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type_of_tagline: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brand_style: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      prize: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      priority: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.STRING,
        allowNull: false,
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
      file_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      original_file_name: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('contests');
  },
};
