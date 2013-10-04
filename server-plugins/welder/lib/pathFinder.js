var navPaths = {};
var navPathsFNcheckList = [];

module.exports = {
    navPaths:navPaths,
    addPath:function(path){
        if(typeof path == "string"){
            var keys = [];//key store
            navPaths[path] = {
                regexp: this.pathRegexp(path,keys),
                keys:keys
            };
        }else if(typeof path == "function"){
            navPathsFNcheckList.push(path);
        }
    },
    checkPath : function(path,callback){
        var matched,params;
        for(var i in navPaths){
           matched =  this.pathParams(path,navPaths[i].regexp,navPaths[i].keys);
           if(!matched){
              continue; 
           }else{
               params  = matched;
               matched = navPaths[i];
               break;
           }
        }
        if(!matched){
            var fnCheckList = [];
            for(var j in navPathsFNcheckList){
                if(navPathsFNcheckList[j] && typeof navPathsFNcheckList[j] == "function")
                    fnCheckList.push(navPathsFNcheckList[j]);
            }
            (function(arr,finished) {
                arr.reverse();
                function nextCheck() {
                    var checkFN = arr.pop();
                    if (!checkFN){
                        if(typeof finished == "function")
                            finished(false);
                        return ;
                    } else {
                        checkFN(path,function (found) {
                            if(!found)
                                nextCheck();
                            else
                                finished(true);
                        });
                    }
                }
                nextCheck();
            })(fnCheckList,function(found){
                callback(found);
            });
        }else
            callback(true);
    },
    pathRegexp : function(path, keys, sensitive, strict) {
      if (path instanceof RegExp) return path;
      if (Array.isArray(path)) path = '(' + path.join('|') + ')';
      path = path
        .concat(strict ? '' : '/?')
        .replace(/\/\(/g, '(?:/')
        .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(_, slash, format, key, capture, optional, star){
          keys.push({ name: key, optional: !! optional });
          slash = slash || '';
          return ''
            + (optional ? '' : slash)
            + '(?:'
            + (optional ? slash : '')
            + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
            + (optional || '')
            + (star ? '(/*)?' : '');
        })
        .replace(/([\/.])/g, '\\$1')
        .replace(/\*/g, '(.*)');
      return new RegExp('^' + path + '$', sensitive ? '' : 'i');
    },
    
    pathParams : function(path,regexp,keys){
        var params = this.params = []
        , m = regexp.exec(path);
    
      if (!m) return false;
    
      for (var i = 1, len = m.length; i < len; ++i) {
        var key = keys[i - 1];
    
        var val = 'string' == typeof m[i]
          ? decodeURIComponent(m[i])
          : m[i];
    
        if (key) {
          params[key.name] = val;
        } else {
          params.push(val);
        }
      }
    
      return params;
    }
};