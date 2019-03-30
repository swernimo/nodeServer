'use strict' 

class userController{
    
    get (request, response, next){
        response.send("get all users");
        next();
    }

    getUser (request, response, next){
        response.send("Hello " + request.params.userName);
        next();
    }
}

module.exports = userController;