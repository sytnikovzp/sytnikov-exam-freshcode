const dbPostgres = require('./src/db/dbPostgres/models');

export const syncModel = async (model) => {
  try {
    await model.sync({ alter: true });
    console.log(`Sync of ${model.name} has been done successfully!`);
  } catch (error) {
    console.log(`Can't sync ${model.name}: `, error.message);
  }
};


export const syncModels = async () => {
  try {
    await dbPostgres.sequelize.sync({ alter: true });
    console.log('Sync all models has been done successfully!');
  } catch (error) {
    console.log('Can not sync all models: ', error.message);
  }
};

// syncModels();
