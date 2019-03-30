const http = require('http');
const url = require('url');

class server{
  constructor(router){
    this.router = router;
  }

  startServer(port = 2500){
     this.server = http.createServer((req, res) => {
        req.params = {};
        let requestURL = url.parse(req.url);
        let path = requestURL.path || '/';
        path = path.toLowerCase();
        console.log('URL object: ' + JSON.stringify(requestURL));
        if (path === '/'){
          this.router.homeRoute(res);
        }else if (path.startsWith('/task')){
          this.router.taskRoute(req, res, path);
        }else if (path.startsWith('/user')){
          this.router.userRoute(req, res, path);
        }
        else{
          this.router.routeNotFound(res);
        }
      });
      this.tryPort(port);
  }

  tryPort(port){
    this.server.listen(port, '127.0.01');
    this.server.on('error', function(){
      console.log('Server already running on port: ' + port);
    });

    this.server.on('listening', function(){
      console.log('server listening on port: ' + port);
    });
  }
}

module.exports = server;