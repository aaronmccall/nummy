var _ = require('../utils');

module.exports = function() {
    var operands = _.concat(_.slice(arguments));
    return operands.reduce(function(prev, current) {
        var first = Number(prev);
        var second = Number(current);
        return _.ifNaN(first, 1) * _.ifNaN(second, 1);
    });
};