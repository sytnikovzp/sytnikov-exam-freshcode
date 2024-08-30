const path = require('path');
const { createServer } = require('http');
// ==========================================
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
// ==========================================
const app = require('./src/app');
const controller = require('./src/socketInit');
const dbPostgres = require('./src/db/dbPostgres/models');
// const { syncModel, syncModels } = require('./src/utils/syncModels');
// ==========================================
const env = process.env.NODE_ENV || 'development';
const pathToConfig = path.resolve('src', 'config', 'mongoConfig');
const config = require(pathToConfig)[env];

// ==================== POSTGRES DB CHECK =======================
const dbCheck = async () => {
  try {
    await dbPostgres.sequelize.authenticate();
    console.log(
      `Connection to DB <<< ${process.env.POSTGRES_DB_NAME} >>> successfully!`
    );
    console.log();
  } catch (error) {
    console.log('Ca not connect to DB: ', error.message);
  }
};

dbCheck();

// ===================== MONGO DB CHECK ==========================
mongoose
  .connect(`mongodb://${config.host}:${config.port}/${config.database}`)
  .then(() =>
    console.log(`Connection to DB <<< ${config.database} >>> successfully!`)
  )
  .catch((err) => console.log(err));

// ===================== SYNC`s model(s) =========================
// syncModel(dbPostgres.model_name);
// syncModels();

// ================ Create server with HTTP module ===============

const HOST = process.env.SH_SERVER_HOST;
const PORT = process.env.SH_SERVER_PORT || 3000;

const server = createServer(app);

// ============= Start server with HTTP & WS module ===============

server.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}/api`)
);

controller.createConnection(server);

console.log('=== Server is started successfully! ===');
console.log();
