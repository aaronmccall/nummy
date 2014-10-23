var _ = require('./utils');

var methods = {
    factor: require('./array/factor')
};

// Update this if any methods with arity <> 1 are added.
_.each(methods, function (method, name) {
    var methodLength = method.length;
    exports[name] = function () {
        var argLength = arguments.length;
        if (methodLength === 1) return method.call(this, argLength ? arguments[0] : this.number);
    };
});
