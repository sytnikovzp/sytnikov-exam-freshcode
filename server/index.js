const http = require('http');
// ============================
require('dotenv').config({ path: '../.env' });
// ============================
const app = require('./src/app');
require('./dbMongo/mongoose');
const controller = require('./src/socketInit');

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}/api`)
);

console.log('Server is started!');

controller.createConnection(server);
