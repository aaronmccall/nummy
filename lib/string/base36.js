var _ = require('../utils');

module.exports = function(n, pad) {
    if (isNaN(n) || Math.abs(n) === Infinity) return String(n);
    return _.padNumber(n, pad || 1, 36).toUpperCase();
};