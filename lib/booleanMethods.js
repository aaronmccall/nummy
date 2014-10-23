var _ = require('./utils');

var methods = {
    isEven: require('./boolean/isEven'),
    isInteger: require('./boolean/isInteger'),
    isMultipleOf: require('./boolean/isMultipleOf'),
    isFactorOf: require('./boolean/isFactorOf'),
    isOdd: require('./boolean/isOdd')
};

_.each(methods, function (method, name) {
    var methodLength = method.length;
    exports[name] = function () {
        var argLength = arguments.length;
        if (!argLength && methodLength === 1) return method.call(this, this.number);
        var first = argLength >= methodLength ? arguments[0] : this.number;
        if (methodLength === 1) return method.call(this, first);
        var second = argLength >= methodLength ? arguments[1] : arguments[0];
        return method.call(this, first, second);
    };
});
