'use strict';

class router{
  constructor(taskController, userController){
    this.taskController = taskController;
    this.userController = userController;
  }

  homeRoute(response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World from home route in router! \n');
  }

  taskRoute(request, response, path){
    let method = request.method;
    let isGet = method === 'GET';
    var match = path.match('[0-9]+');
    if(match){
      let taskId = match[0];
      request.params.taskId = taskId;
      if(isGet)
        this.taskController.getTask(request, response);
    }else{
      if(isGet){
        this.taskController.getAll(request, response);
      }
    }

  }

  userRoute(request, response, path){

  }

  routeNotFound(response){
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end("These are not the pages you're looking for...");
  }
}

module.exports = router;