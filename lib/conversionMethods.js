var _ = require('./utils');
 
var methods = {
    toInteger: require('./conversion/toInteger'),
    toInt32: require('./conversion/toInt32'),
    toUInt32: require('./conversion/toUInt32'),
    toNumber: require('./conversion/toNumber')
};

_.each(methods, function (method, key) {
    exports[key] = function (n) {
        return _.isUndefined(n) ? method.call(this, this.number) : method.call(this, n);
    };
});
