var _ = require('../utils');

module.exports = function() {
    var addends =  _.concat(_.slice(arguments));
    return addends.reduce(function(prev, current, i) {
        if (i === 1) {
            prev = +(prev);
        }
        current = +(current);
        return _.ifNaN(prev, 0) + _.ifNaN(current, 0);
    });
};