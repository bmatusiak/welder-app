"use strict";
var pathFinder = require("./pathFinder.js");

module.exports = function(options, imports,welder,setup) {
            
    var _Routes = {};
    
    function Router(){
        return _Routes;
    }
    
    Router.addRoute = function(routeName,RouteFn){
        if(typeof routeName == "function"){
            pathFinder.addPath(routeName);
        }else{
            _Routes[routeName] = RouteFn || routeName;
        }
    };
        
    Router.listen = function(getPaths,architectClientPlugins,callback){
        var http = imports.http;
        
        for(var i in _Routes){
           http.app.use(i,_Routes[i]);
        }
                    
        
        callback();
    };


    setup(Router);
};

