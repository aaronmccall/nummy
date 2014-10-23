var printf = require('util').format;
var _ = require('../lib/utils');

function wrapDone(fn) {
    return function(done) {
        fn();
        done();
    };
}

module.exports = function (nummy, lab, expect) {
    var describe = lab.experiment;
    var it = lab.test;
    var afterEach = lab.afterEach;
    var beforeEach = lab.beforeEach;


    describe('array', function () {

        describe('#factor', function () {
            [
                [12, [1, 2, 3, 4, 6]],
                [45, [1, 3, 5, 9, 15]],
                [100, [1, 2, 4, 5, 10, 20, 25, 50]]
            ].forEach(function (test) {
                it(printf('factors of %d are %j', test[0], test[1]), wrapDone(function () {
                    expect(nummy(test[0]).factor()).to.eql(test[1]);
                }));
            });
        });
    });
};