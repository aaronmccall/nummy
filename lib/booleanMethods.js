var maths = require('./mathMethods');
var _ = require('./utils');

var methods = {
    isEven: function(n) {
        return !isNaN(n) && methods.isMultipleOf(n, 2);
    },
    isInteger: function(n) {
        return !isNaN(n) && maths.modulo(n, 1) === 0;
    },
    isMultipleOf: function(n, num) {
        return !_.anyNaN(n, num) && maths.modulo(n, num) === 0;
    },
    isFactorOf: function (n, num) {
        return !_.anyNaN(n, num) && maths.moduloOf(n, num) === 0;
    },
    isOdd: function(n) {
        return !isNaN(n) && !methods.isMultipleOf(n, 2);
    }
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
