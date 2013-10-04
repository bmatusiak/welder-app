module.exports = function(passConfig){
    passConfig([
        "./app.main",
        
        "./db.mongoose",
        "./app.session",
        "./welder"
    ]);
};

