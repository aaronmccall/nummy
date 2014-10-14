var _ = require('./utils');

var methods = {
    toInteger: function (n) {
        return n < 0 ? Math.ceil(n) : Math.floor(n);
    },
    toInt32: function (n) {
        return n >> 0;
    },
    toUInt32: function (n) {
        return n >>> 0;
    },
    toNumber: function(n) {
        return parseFloat(n, 10);
    }
};

_.each(methods, function (method, key) {
    exports[key] = function (n) {
        return _.isUndefined(n) ? method.call(this, this.number) : method.call(this, n);
    };
});