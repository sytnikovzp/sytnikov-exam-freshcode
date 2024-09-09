const path = require('path');
const { createServer } = require('http');
// ==========================================
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
// ==========================================
const app = require('./src/app');
const { createConnection } = require('./src/socketInit');
const { sequelize } = require('./src/db/dbPostgres/models');
// const { syncModel, syncModels } = require('./src/utils/syncModels');
// ==========================================
const env = process.env.NODE_ENV || 'development';
const pathToConfig = path.resolve('src', 'config', 'mongoConfig');
const config = require(pathToConfig)[env];

// ==================== POSTGRES DB CHECK =======================

const postgresConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Connection to DB <<< ${process.env.POSTGRES_DB_NAME} >>> successfully!`
    );
  } catch (error) {
    console.log('Can not connect to postgres DB: ', error.message);
  }
};

postgresConnect();

// ===================== MONGO DB CHECK ==========================

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb://${config.host}:${config.port}/${config.database}`
    );
    console.log(`Connection to DB <<< ${config.database} >>> successfully!`);
  } catch (error) {
    console.log('Can not connect to mongo DB: ', error.message);
  }
};

mongoConnect();

// ===================== SYNC`s model(s) =========================

// syncModel(model_name);
// syncModels();

// ================ Create server with HTTP module ===============

const HOST = process.env.SH_SERVER_HOST;
const PORT = process.env.SH_SERVER_PORT || 3000;

const server = createServer(app);

// ============= Start server with HTTP & WS module ===============

server.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}/api`)
);

createConnection(server);

console.log();
console.log('===== Server is started successfully! =====');
console.log();
