"use strict";
module.exports = function(options, imports, register) {
    
    var welder;
    
    var http = imports.http = require("./plugins/web.http/http.js")();
    //compress everything
    http.app.use(http.express.compress());
    
    var __StaticMountPaths = [];
    function _StaticFiles(){
        var Path,mount,name;
        for (name in __StaticMountPaths) {
            Path = __StaticMountPaths[name].toString();
            mount = name;
            addStaticMount(mount, Path,true);
        } 
    }
    function addStaticMount(mount, dir, listDirAlso){
        if(options.listDirectories || listDirAlso)
            http.app.use(mount, http.express.directory(dir));
        
        http.app.use(mount, http.express.static(dir));
        console.log("Static Mounted",mount,"=",dir);
    }
    
    var __RequestParsers = [];
    function _RequestParsers(){
        //every thing under there gets cookies and session data
        http.app.use(http.express.bodyParser());
        http.app.use(http.express.cookieParser(options.clientSecret));
        
        for (var i in __RequestParsers) {
            __RequestParsers[i](http);
        } 
        console.log("_RequestParsers done");
    }
    
    var __Middlewares = [];
    function _Middlewares(){
        for(var i in __Middlewares){
            __Middlewares[i](http);
        }
        console.log("_Middlewares done");
    }
    
    var onListenRoutes;
    var indexRoutes = [];
    var pluginsInit = [];
    
    function beforeListen(callback){
        _StaticFiles();
        _RequestParsers();
        _Middlewares();
        
        
        onListenRoutes(indexRoutes,pluginsInit,function(){
            callback(pluginsInit);
        });
    }
    
    welder = {
        start:function(callback){
            this.listen(callback);
        },
        listen:function(callback){
            beforeListen(function(someData){
                try{
                    http.listen();
                    callback();
                }catch(e){
                    callback(e);
                }
            });
        },
        addStatic:function(mount,dir,listDirAlso){
            if(options.listDirectories || listDirAlso)
                http.app.use(mount, http.express.directory(dir));
            
            http.app.use(mount, http.express.static(dir));
            console.log("Static Mounted",mount,"=",dir);
        },
        addMiddleWare:function(fn){
            __Middlewares.push(fn);
        },
        addRequestParser:function(fn){
            __RequestParsers.push(fn);
        },
    };
    
    require("./lib/routes.js")(options,imports,welder,function(router){
        welder.addRoute = router.addRoute;
        welder.routeCheck = router.routeCheck;
        onListenRoutes = router.listen;
        
        welder.jquery = router.jquery;
            
        register(null,{"welder": welder});
    });
};