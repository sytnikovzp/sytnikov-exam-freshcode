const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Select extends Model {}
  Select.init(
    {
      type: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      describe: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Select',
      tableName: 'selects',
      timestamps: false,
      underscored: true,
    }
  );
  return Select;
};
