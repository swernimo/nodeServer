class request{
    constructor(method){
        this.method = method;
        this.params = {};
    }
}

describe('Route', function(){
    var taskControllerSpy;
    var userControllerSpy;
    var router;
    var httpResponse = jasmine.createSpyObj(["writeHead", "end"]);
    var httpRequest = new request('GET');

    beforeAll(function(){
        var routerClass = require('../router');
        var taskController = require('../controllers/task');
        var userController = require('../controllers/user');
        var userControllerClass = new userController();
        var taskControllerClass = new taskController();
        taskControllerSpy = spyOnAllFunctions(taskControllerClass);
        userControllerSpy = spyOnAllFunctions(userControllerClass);
        router = new routerClass(taskControllerSpy, userControllerSpy);
    });

    describe('home route', function(){
        it('should return a 200', function(){
            router.homeRoute(httpResponse);
            expect(httpResponse.writeHead).toHaveBeenCalledWith(200, {'Content-Type': 'text/plain'});
        });

        it('should write hello world', function(){
            router.homeRoute(httpResponse);
            expect(httpResponse.end).toHaveBeenCalledWith('Hello World from home route in router! \n');
        });
    });

    describe('handle route not found', function(){
        it('should return a 404', function(){
            router.routeNotFound(httpResponse);
            expect(httpResponse.writeHead).toHaveBeenCalledWith(404, {'Content-Type': 'text/plain'});
        });

        it('should write error message', function(){
            router.routeNotFound(httpResponse);
            expect(httpResponse.end).toHaveBeenCalledWith('These are not the pages you\'re looking for...');
        });
    });

    describe('task route', function(){
        it('should call get all tasks when method is GET and no task id is supplied', function(){
            httpRequest.method = 'GET';
            spyOn(taskControllerSpy, 'getAll');
            router.taskRoute(httpRequest, httpResponse, '/');
            expect(taskControllerSpy.getAll).toHaveBeenCalled();
        });

        it('should set request.params.taskId when task ID is in path', function(){
            var taskId = '1234';
            httpRequest.method = 'GET';
            var path = '/task/' + taskId;
            router.taskRoute(httpRequest, httpResponse, path);
            expect(httpRequest.params.taskId).toBe(taskId);
        });

        it('should call get task', function(){
            var taskId = '1234';
            httpRequest.method = 'GET';
            var path = '/task/' + taskId;
            spyOn(taskControllerSpy, 'getTask');
            router.taskRoute(httpRequest, httpResponse, path);
            expect(taskControllerSpy.getTask).toHaveBeenCalled();
        });
    });
});