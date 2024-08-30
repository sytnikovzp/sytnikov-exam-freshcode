const fs = require('fs');
const path = require('path');
// ====================================
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = require(path.resolve('.sequelizerc')).config;
const config = require(configPath)[env];
const dbPostgres = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    dbPostgres[model.name] = model;
  });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

dbPostgres['Contests'].belongsTo(dbPostgres['Users'], {
  foreignKey: 'userId',
  sourceKey: 'id',
});
dbPostgres['Contests'].hasMany(dbPostgres['Offers'], {
  foreignKey: 'contestId',
  targetKey: 'id',
});

dbPostgres['Users'].hasMany(dbPostgres['Offers'], { foreignKey: 'userId', targetKey: 'id' });
dbPostgres['Users'].hasMany(dbPostgres['Contests'], { foreignKey: 'userId', targetKey: 'id' });
dbPostgres['Users'].hasMany(dbPostgres['Ratings'], { foreignKey: 'userId', targetKey: 'id' });

dbPostgres['Offers'].belongsTo(dbPostgres['Users'], { foreignKey: 'userId', sourceKey: 'id' });
dbPostgres['Offers'].belongsTo(dbPostgres['Contests'], {
  foreignKey: 'contestId',
  sourceKey: 'id',
});
dbPostgres['Offers'].hasOne(dbPostgres['Ratings'], { foreignKey: 'offerId', targetKey: 'id' });

dbPostgres['Ratings'].belongsTo(dbPostgres['Users'], { foreignKey: 'userId', targetKey: 'id' });
dbPostgres['Ratings'].belongsTo(dbPostgres['Offers'], {
  foreignKey: 'offerId',
  targetKey: 'id',
});

dbPostgres.sequelize = sequelize;
dbPostgres.Sequelize = Sequelize;

module.exports = dbPostgres;
