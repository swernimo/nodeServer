describe('http server', function(){
    var http = require('http');
    var routerSpy;
    var port = 3000;
    var baseUrl = 'http://localhost:' + port + '/';

    beforeAll(function(){
        var httpServer = require('../httpServer');
        routerSpy = jasmine.createSpyObj(['homeRoute', 'taskRoute', 'userRoute', 'routeNotFound']);
        var server = new httpServer(routerSpy);
        server.startServer(port);
    });

    describe('home request', function(){
        it('should call router home route', function(){
           http.get(baseUrl, () =>{
            expect(routerSpy.homeRoute).toHaveBeenCalled();
           });
        });

        it('should fail', function(){
            expect(true).toBeFalsy();
        });
    });

    describe('task request', function(){
        it('should call task route with task', function(){
            http.get(baseUrl + '/task', () =>{
                expect(routerSpy.taskRoute).toHaveBeenCalled();
            });
        });
        it('should call task route with task and id', function(){
            http.get(baseUrl + '/task/1234', () =>{
                expect(routerSpy.taskRoute).toHaveBeenCalled();
            });
        });
    });

    describe('error handling', function(){
        it('should call route not found for invalid route', function(){
            http.get(baseUrl + '/someOtherRoute', () => {
                expect(routerSpy.routeNotFound).toHaveBeenCalled();
            });
        });
    });
});