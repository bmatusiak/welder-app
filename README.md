welder-app
==========

welder-app is a basic template based off the architect structure

----

Startup Process
----

1.  Static Files
2.  Middlewares
3.  Request Parsers 

Welder Functions
----

__addStatic(mount,dir,listDirAlso)__

*   _mount_ : is the Web Directory
*   _dir_ : is the Server Directory
*   _listDirAlso_ : is to provide directory listings

__addMiddleWare:function(fn)__

*   _fn(http)_ : provides the http object

__addRequestParser:function(fn)__

*   _fn(http)_ : provides the http object

Welder Objects
----

__http__

the http object is a pre-setup express objects

*   _app_ : provides direct access to the express app
*   _server_ : provides direct access to the http server
*   _express_ : provides direct access to the express object
*   _listen_ : used by welder internaly _function(port,ip,callback)_ but can be used to listen on another port

How _pre-setup express_ is configured
----

Express is setup to compress all output.

__bodyParser__ and __cookieParser__ are loaded before middlewares

Example Plugins
----


__app.main__ : 

__app.session__ : Shows how to add 

__db.mongoose__ : 




Version interp
----
the relates to the package.js file

As you can see the version of your app should be in a fourm of "X.Y.Z"

and X if the welder version so you can always know what version of welder you have

and Y is release version

and Z is sub-release version 

```json
{
    "name": "welder-app",
    "version": "1.1.32",
    "dependencies": {
        "express": "*",
        "architect": "*",
        "mongoose": "*"
    }
}
```