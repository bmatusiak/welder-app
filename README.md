welder-app
==========

welder-app is a basic template based off the architect structure

----

Startup Process
----

1.  Static Files
2.  Request Parsers
3.  Middlewares


Built-in Mongdb support with mongoose
----

Mongoose is builtin with welder


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
    "version": "1.0.0",
    "dependencies": {
        "express": "*",
        "architect": "*",
        "mongoose": "*"
    }
}
```