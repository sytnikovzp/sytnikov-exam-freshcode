require('dotenv').config({ path: '../.env' });

module.exports = {
  development: {
    database: process.env.MONGO_DB_NAME,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
  },
  production: {
    database: 'shm-chat',
    host: 'localhost',
    port: 27017,
  },
};
