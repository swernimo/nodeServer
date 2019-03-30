'use strict' 

class taskController{
    
    getAll (request, response){
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('get all tasks \n');
    }

    getTask (request, response){
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end("task id: " + request.params.taskId);
    }
}

module.exports = taskController;