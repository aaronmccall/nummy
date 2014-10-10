var Nummy;

// Chainable Nummy wrapper
function NummyChain(number) {
    this.nummy = new Nummy(number);
}

NummyChain.prototype.value = function() {
    if (this._last === 'boolean') return this._value;
    if (this._last === 'string') return this.nummy.toString();
    return this.nummy.valueOf();
};

var booleanMethods = NummyChain._booleanMethods = ['isEven', 'isOdd', 'isInteger', 'isMultipleOf'];
booleanMethods.forEach(function(name) {
    NummyChain.prototype[name] = function(a) {
        this._last = 'boolean';
        this._value = this.nummy[name](a);
        return this;
    };
});

var numberMethods = NummyChain._numberMethods = ['abs', 'sin', 'asin', 'cos', 'acos', 'tan', 'atan', 'exp', 'pow', 'sqrt', 'log', 'ceil', 'round', 'floor'];
numberMethods.forEach(function(name) {
    NummyChain.prototype[name] = function(a, b) {
        this._last = 'number';
        this.nummy.number = this.nummy[name](a, b);
        return this;
    };
});

var stringMethods = NummyChain._stringMethods = ['ordinalize', 'pad', 'chr', 'hex', 'format', 'metric', 'abbr', 'bytes'];
stringMethods.forEach(function(name) {
    NummyChain.prototype[name] = function(a, b, c) {
        this._last = 'string';
        this.nummy.string = this.nummy[name](a, b, c);
        return this;
    };
});

var wrapMethods = NummyChain._wrapMethods = ['toString', 'valueOf', 'setDefaultFormat'];
wrapMethods.forEach(function(name) {
    NummyChain.prototype[name] = function(a, b, c) {
        var result = this.nummy[name](a, b, c);
        if (typeof result === 'undefined') return this;
        return result;
    };
});

module.exports = {
    init: function(_Nummy) {
        Nummy = _Nummy;
        return NummyChain;
    }
};