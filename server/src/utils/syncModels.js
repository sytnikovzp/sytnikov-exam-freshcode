const { sequelize } = require('../db/dbPostgres/models');

module.exports.syncModel = async (model) => {
  try {
    await model.sync({ alter: true });
    console.log('===========================================');
    console.log(`Sync of ${model.name} has been done successfully!`);
  } catch (error) {
    console.log('===========================================');
    console.log(`Can't sync ${model.name}: `, error.message);
  }
};

module.exports.syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('===========================================');
    console.log('Sync all models has been done successfully!');
  } catch (error) {
    console.log('===========================================');
    console.log('Can not sync all models: ', error.message);
  }
};
