const server = require('./httpServer');
let routerClass = require('./router');
let taskClass = require('./controllers/task');
let userClass = require('./controllers/user');
let userController = new userClass();
let taskController = new taskClass();

const serverInstance = new server(new routerClass(taskController, userController));
serverInstance.startServer(3000);