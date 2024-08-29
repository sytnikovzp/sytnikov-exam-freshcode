const http = require('http');
// ============================
require('dotenv').config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
require('./dbMongo/mongoose');
const router = require('./router');
const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);

const server = http.createServer(app);

server.listen(PORT, HOST, () =>
  console.log(`Server running at http://${HOST}:${PORT}/api`)
);

console.log('Server is started!');

controller.createConnection(server);
