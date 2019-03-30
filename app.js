const server = require('./httpServer');
const serverInstance = new server();

serverInstance.startServer(3000);