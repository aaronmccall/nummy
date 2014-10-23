var _ = require('../utils');
var moduloOf = require('../math/moduloOf');

module.exports = function (n, num) {
    return !_.anyNaN(n, num) && moduloOf(n, num) === 0;
};