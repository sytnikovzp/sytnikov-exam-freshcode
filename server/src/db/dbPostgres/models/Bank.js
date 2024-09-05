const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bank extends Model {}
  Bank.init(
    {
      cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiry: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cvc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Bank',
      tableName: 'banks',
      timestamps: false,
      underscored: true,
    }
  );
  return Bank;
};
