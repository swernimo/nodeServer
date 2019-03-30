describe('http server', function(){
    var http = require('http');
    var sinon = require('sinon');
    const {fork, exec} = require('child_process');
    var server;
    var routerSpy;

    beforeAll(function(){
        var routerClass = require('../router');
        var taskControllerSpy;
        var userControllerSpy;
        var taskController = require('../controllers/task');
        var userController = require('../controllers/user');
        var userControllerClass = new userController();
        var taskControllerClass = new taskController();
        taskControllerSpy = spyOnAllFunctions(taskControllerClass);
        userControllerSpy = spyOnAllFunctions(userControllerClass);
        router = new routerClass(taskControllerSpy, userControllerSpy);
        routerSpy = spyOnAllFunctions(router);
       // server = exec('node ../app.js');
       
   //     var pid = server.pid;
    });

    beforeEach(function(){
        server = fork('app.js');
    });

    afterEach(function(){
        if(server){
          //  exec('killall node');
        }
    });

   afterAll(function(){
    });

    describe('home request', function(){
        it('should call router home route', function(){
           spyOn(routerSpy, 'homeRoute');
           http.get('http://localhost:3000/');
           expect(routerSpy.homeRoute).toHaveBeenCalled();
        });
    });
});