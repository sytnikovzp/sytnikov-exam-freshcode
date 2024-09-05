const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Order, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      User.hasMany(models.Participant, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      User.hasMany(models.Offer, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      User.hasMany(models.RefreshToken, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      User.hasMany(models.Contest, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });

      User.hasMany(models.Rating, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      role: {
        type: DataTypes.ENUM('customer', 'creator'),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
      underscored: true,
    }
  );
  return User;
};
