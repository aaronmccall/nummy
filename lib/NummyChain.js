
var utils = require('./utils');
var arrayMethods = require('./arrayMethods');
var booleanMethods = require('./booleanMethods');
var conversionMethods = require('./conversionMethods');
var stringMethods = require('./stringMethods');
var mathMethods = require('./mathMethods');

var Nummy;

var options;
var defaultOptions = {
    keepStack: true,
    stackSize: 50,
    updateValue: true,
    autoValueOf: true
};

// Chainable Nummy wrapper
function NummyChain(number, opts) {
    this.options = utils.extend({}, options, opts);
    this.nummy = new Nummy(number, this.options);
    this._stack = [this.nummy.number];
    var handleResult = this.nummy._handleResult.bind(this.nummy);
    this.nummy._handleResult = this._handleResult.bind(this, handleResult);
}

var proto = NummyChain.prototype;

proto._handleResult = function(handleResult, result) {
    handleResult(result);
    if (this.options.keepStack) {
        this._stack.push(result);
        if (this._stack.length > this.options.stackSize) {
            this._stack.shift();
        }
    }
};

proto.value = function() {
    return this.nummy.valueOf();
};

proto.valueOf = function () {
    return this.nummy.valueOf();
};

proto.toString = function (base) {
    // Expecting ordinary Number.prototype.toString behavior
    var undo;
    var lastType = this.nummy.lastType;
    var result = this.nummy.toString(base);
    if (lastType !== 'string' && typeof base !== 'number') {
        undo = true;
    }
    // Get Nummy instance's string representation without breaking
    // valueOf for future calls.
    if (undo) this.undo();
    return result;
};

proto.take = function(length) {
    return this._stack.length ? this._stack.slice(-(length)||0) : [this.nummy.valueOf()];
};

proto.undo = function (steps) {
    // Allows for negative and string
    if (typeof steps !== 'number') {
        steps = Math.abs(steps);
        if (isNaN(steps)) steps = 1;
    }
    // Undoing zero steps makes no sense.
    if (!steps) return;
    // If undo steps are greater than stack size, reset to first value
    if (steps > this._stack.length) return this.resetStack();
    // All steps up to undo
    var left = this._stack.slice(0, -(steps));
    // All steps being undone
    var right = this._stack.slice(-(steps));
    // Value reverting to
    var last = left.slice(-1).pop();
    var type = utils.smartTypeof(last);
    this.nummy.lastType = type;
    this.nummy[type] = last;
    // Reset stack to omit undone steps
    this._stack = left;
    // Return removed steps
    return right;
};
proto.rewind = proto.undo;

proto.resetStack = function () {
    return this.undo(-1);
};

var setupMethod = (function (name) {
    if (name === 'methods') return;
    this[name] = function () {
        utils.smartCall(this.nummy[name], arguments, this.nummy);
        return this;
    };
});

var arrayMethods = NummyChain._arrayMethods = Object.keys(arrayMethods);
var booleanMethods = NummyChain._booleanMethods = Object.keys(booleanMethods);
var numberMethods = NummyChain._numberMethods = [].concat(Object.keys(conversionMethods), Object.keys(mathMethods));
var stringMethods = NummyChain._stringMethods = Object.keys(stringMethods);
// configure all Nummy methods for chaining
[].concat(arrayMethods, booleanMethods, numberMethods, stringMethods, 'setDefaultFormat').forEach(setupMethod, proto);


module.exports = {
    init: function(_Nummy, opts) {
        options = utils.extend({}, defaultOptions, opts);
        Nummy = _Nummy;
        return NummyChain;
    }
};