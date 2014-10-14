var slice = Array.prototype.slice.call.bind(Array.prototype.slice);
exports.slice = slice;

function allNaN() {
    return slice(arguments).every(isNaN);
}
exports.allNaN = allNaN;

function anyNaN() {
    return slice(arguments).some(isNaN);
}
exports.anyNaN = anyNaN;

function anyInfinite() {
    return slice(arguments).some(function (val) { return Math.abs(val) === Infinity; });
}
exports.anyInfinite = anyInfinite;

function each(obj, fn, context) {
    if (smartTypeof(obj) === 'array') {
        return obj.forEach(fn, context || this);
    }
    var key;
    for (key in obj) {
        fn.call(context || this, obj[key], key, obj);
    }
}
exports.each = each;

function isUndefined(o) {
    return typeof o === 'undefined';
}
exports.isUndefined = isUndefined;

function isNumber(o) {
    return typeof o === 'number';
}
exports.isNumber = isNumber;


function defaults(target) {
    var defaultSources = slice(arguments, 1);
    for (var i=0, l=defaultSources.length, key, source; i<l; i++) {
        source = defaultSources[i];
        if (!source) continue;
        for (key in source) {
            if (!isUndefined(source[key]) && isUndefined(target[key])) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
exports.defaults = defaults;

function extend(target) {
    target = (smartTypeof(target) === 'object') ? target : {};
    var sources = slice(arguments, 1);
    for (var i=0, l=sources.length, key, source; i<l; i++) {
        source = sources[i];
        if (!source) continue;
        for (key in source) {
            if (!isUndefined(source[key])) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
exports.extend = extend;

function resultify(fn) {
    return function () {
        var result = smartCall(fn, arguments, this);
        this._handleResult(result);
        return result;
    };
}
exports.resultify = resultify;

function smartCall(fn, args, context) {
    var result;
    var argLength = args.length;
    if (args.length > 3) {
        result = fn.apply(context||null, args);
    } else if (argLength === 0) {
        result = fn.call(context||null);
    } else if (argLength === 1) {
        result = fn.call(context||null, args[0]);
    } else if (argLength === 2) {
        result = fn.call(context||null, args[0], args[1]);
    } else if (argLength === 3) {
        result = fn.call(context||null, args[0], args[1], args[2]);
    }
    return result;
}
exports.smartCall = smartCall;

function smartTypeof(val) {
    var typeOf = typeof val;
    var objectType;
    if (typeOf === 'object') {
        if (Array.isArray(val)) return 'array';
        if (val === null) return 'null';
        objectType = Object.prototype.toString.call(val).split('[object ');
        if (objectType.length === 2) {
            typeOf = objectType.pop().slice(0, -1).toLowerCase();
        }
    }
    return typeOf;
}
exports.smartTypeof = smartTypeof;

/*
 *  Sugar Library v1.4.1
 *
 *  Freely distributable and licensed under the MIT-style license.
 *  Copyright (c) 2013 Andrew Plummer
 *  http://sugarjs.com/
 *
 * ---------------------------- */
function withPrecision(val, precision, fn) {
    var multiplier = Math.pow(10, Math.abs(precision || 0));
    fn = fn || Math.round;
    if (precision < 0) multiplier = 1 / multiplier;
    return fn(val * multiplier) / multiplier;
}
exports.withPrecision = withPrecision;