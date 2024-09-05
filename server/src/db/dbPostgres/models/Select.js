const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Select extends Model {}
  Select.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      describe: {
        type: DataTypes.STRING,
        allowNull: false,
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
