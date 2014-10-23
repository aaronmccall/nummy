var _ = require('../utils');

module.exports = function (n) {
    var n_factors = [], i;

    for (i = 1; i <= Math.floor(Math.sqrt(n)); i += 1)
        if (n % i === 0) {
            n_factors.push(i);
            if (n / i !== i && n / i !== n) n_factors.push(n / i);
        }
    n_factors.sort(_.numericSort); // numeric sort
    return n_factors;
};