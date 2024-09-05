const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate(models) {
      Offer.belongsTo(models.User, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      Offer.belongsTo(models.Contest, {
        foreignKey: 'contestId',
        sourceKey: 'id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      Offer.hasOne(models.Rating, {
        foreignKey: 'offerId',
        targetKey: 'id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Offer.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      originalFileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      modelName: 'Offer',
      tableName: 'offers',
      timestamps: false,
      underscored: true,
    }
  );
  return Offer;
};
