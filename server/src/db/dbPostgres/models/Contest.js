const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contest extends Model {
    static associate(models) {
      Contest.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      Contest.hasMany(models.Offer, {
        foreignKey: 'contestId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Contest.init(
    {
      contestType: {
        type: DataTypes.ENUM('name', 'tagline', 'logo'),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typeOfName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      industry: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      focusOfWork: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      targetCustomer: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      styleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nameVenture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      typeOfTagline: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brandStyle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      prize: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      originalFileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    },
    {
      sequelize,
      modelName: 'Contest',
      tableName: 'contests',
      timestamps: true,
      underscored: true,
    }
  );
  return Contest;
};
