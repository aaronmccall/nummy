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

    describe('string', function () {
        describe('#abbr', function () {
            it('1', wrapDone(function() {
                expect(nummy(1).abbr()).to.equal('1');
            }));
            it('10', wrapDone(function() {
                expect(nummy(10).abbr()).to.equal('10');
            }));
            it('100', wrapDone(function() {
                expect(nummy(100).abbr()).to.equal('100');
            }));
            it('1,000', wrapDone(function() {
                expect(nummy(1000).abbr()).to.equal('1k');
            }));
            it('10,000', wrapDone(function() {
                expect(nummy(10000).abbr()).to.equal('10k');
            }));
            it('100,000', wrapDone(function() {
                expect(nummy(100000).abbr()).to.equal('100k');
            }));
            it('1,000,000', wrapDone(function() {
                expect(nummy(1000000).abbr()).to.equal('1m');
            }));
            it('10,000,000', wrapDone(function() {
                expect(nummy(10000000).abbr()).to.equal('10m');
            }));
            it('100,000,000', wrapDone(function() {
                expect(nummy(100000000).abbr()).to.equal('100m');
            }));
            it('1,000,000,000', wrapDone(function() {
                expect(nummy(1000000000).abbr()).to.equal('1b');
            }));
            it('10,000,000,000', wrapDone(function() {
                expect(nummy(10000000000).abbr()).to.equal('10b');
            }));
            it('100,000,000,000', wrapDone(function() {
                expect(nummy(100000000000).abbr()).to.equal('100b');
            }));
            it('1,000,000,000,000', wrapDone(function() {
                expect(nummy(1000000000000).abbr()).to.equal('1t');
            }));
            it('1,000,000,000,000,000,000', wrapDone(function() {
                expect(nummy(1000000000000000000).abbr()).to.equal('1,000,000t');
            }));

            it('decimal | 1', wrapDone(function() {
                expect(nummy(1).abbr()).to.equal('1');
            }));
            it('decimal | 12', wrapDone(function() {
                expect(nummy(12).abbr()).to.equal('12');
            }));
            it('decimal | 124', wrapDone(function() {
                expect(nummy(124).abbr()).to.equal('124');
            }));
            it('decimal | 1,249', wrapDone(function() {
                expect(nummy(1249).abbr()).to.equal('1k');
            }));
            it('decimal | 1,749', wrapDone(function() {
                expect(nummy(1749).abbr()).to.equal('2k');
            }));
            it('decimal | 12,495', wrapDone(function() {
                expect(nummy(12495).abbr()).to.equal('12k');
            }));
            it('decimal | 17,495', wrapDone(function() {
                expect(nummy(17495).abbr()).to.equal('17k');
            }));
            it('decimal | 124,958', wrapDone(function() {
                expect(nummy(124958).abbr()).to.equal('125k');
            }));
            it('decimal | 174,958', wrapDone(function() {
                expect(nummy(174958).abbr()).to.equal('175k');
            }));
            it('decimal | 1,249,584', wrapDone(function() {
                expect(nummy(1249584).abbr()).to.equal('1m');
            }));
            it('decimal | 1,749,584', wrapDone(function() {
                expect(nummy(1749584).abbr()).to.equal('2m');
            }));

            it('decimal 1 place | 1', wrapDone(function() {
                expect(nummy(1).abbr(1)).to.equal('1');
            }));
            it('decimal 1 place | 12', wrapDone(function() {
                expect(nummy(12).abbr(1)).to.equal('12');
            }));
            it('decimal 1 place | 124', wrapDone(function() {
                expect(nummy(124).abbr(1)).to.equal('124');
            }));
            it('decimal 1 place | 1,249', wrapDone(function() {
                expect(nummy(1249).abbr(1)).to.equal('1.2k');
            }));
            it('decimal 1 place | 1,749', wrapDone(function() {
                expect(nummy(1749).abbr(1)).to.equal('1.7k');
            }));
            it('decimal 1 place | 12,495', wrapDone(function() {
                expect(nummy(12495).abbr(1)).to.equal('12.5k');
            }));
            it('decimal 1 place | 17,495', wrapDone(function() {
                expect(nummy(17495).abbr(1)).to.equal('17.5k');
            }));
            it('decimal 1 place | 124,958', wrapDone(function() {
                expect(nummy(124958).abbr(1)).to.equal('125k');
            }));
            it('decimal 1 place | 174,958', wrapDone(function() {
                expect(nummy(174958).abbr(1)).to.equal('175k');
            }));
            it('decimal 1 place | 1,249,584', wrapDone(function() {
                expect(nummy(1249584).abbr(1)).to.equal('1.2m');
            }));
            it('decimal 1 place | 1,749,584', wrapDone(function() {
                expect(nummy(1749584).abbr(1)).to.equal('1.7m');
            }));

            it('decimal 2 places | 1', wrapDone(function() {
                expect(nummy(1).abbr(2)).to.equal('1');
            }));
            it('decimal 2 places | 12', wrapDone(function() {
                expect(nummy(12).abbr(2)).to.equal('12');
            }));
            it('decimal 2 places | 124', wrapDone(function() {
                expect(nummy(124).abbr(2)).to.equal('124');
            }));
            it('decimal 2 places | 1,249', wrapDone(function() {
                expect(nummy(1249).abbr(2)).to.equal('1.25k');
            }));
            it('decimal 2 places | 1,749', wrapDone(function() {
                expect(nummy(1749).abbr(2)).to.equal('1.75k');
            }));
            it('decimal 2 places | 12,495', wrapDone(function() {
                expect(nummy(12495).abbr(2)).to.equal('12.5k');
            }));
            it('decimal 2 places | 17,495', wrapDone(function() {
                expect(nummy(17495).abbr(2)).to.equal('17.5k');
            }));
            it('decimal 2 places | 124,958', wrapDone(function() {
                expect(nummy(124958).abbr(2)).to.equal('124.96k');
            }));
            it('decimal 2 places | 174,958', wrapDone(function() {
                expect(nummy(174958).abbr(2)).to.equal('174.96k');
            }));
            it('decimal 2 places | 1,249,584', wrapDone(function() {
                expect(nummy(1249584).abbr(2)).to.equal('1.25m');
            }));
            it('decimal 2 places | 1,749,584', wrapDone(function() {
                expect(nummy(1749584).abbr(2)).to.equal('1.75m');
            }));

            it('decimal 3 places | 1', wrapDone(function() {
                expect(nummy(1).abbr(3)).to.equal('1');
            }));
            it('decimal 3 places | 12', wrapDone(function() {
                expect(nummy(12).abbr(3)).to.equal('12');
            }));
            it('decimal 3 places | 124', wrapDone(function() {
                expect(nummy(124).abbr(3)).to.equal('124');
            }));
            it('decimal 3 places | 1,249', wrapDone(function() {
                expect(nummy(1249).abbr(3)).to.equal('1.249k');
            }));
            it('decimal 3 places | 1,749', wrapDone(function() {
                expect(nummy(1749).abbr(3)).to.equal('1.749k');
            }));
            it('decimal 3 places | 12,495', wrapDone(function() {
                expect(nummy(12495).abbr(3)).to.equal('12.495k');
            }));
            it('decimal 3 places | 17,495', wrapDone(function() {
                expect(nummy(17495).abbr(3)).to.equal('17.495k');
            }));
            it('decimal 3 places | 124,958', wrapDone(function() {
                expect(nummy(124958).abbr(3)).to.equal('124.958k');
            }));
            it('decimal 3 places | 174,958', wrapDone(function() {
                expect(nummy(174958).abbr(3)).to.equal('174.958k');
            }));
            it('decimal 3 places | 1,249,584', wrapDone(function() {
                expect(nummy(1249584).abbr(3)).to.equal('1.25m');
            }));
            it('decimal 3 places | 1,749,584', wrapDone(function() {
                expect(nummy(1749584).abbr(3)).to.equal('1.75m');
            }));

            it('decimal -1 places | 1', wrapDone(function() {
                expect(nummy(1).abbr(-1)).to.equal('0');
            }));
            it('decimal -1 places | 12', wrapDone(function() {
                expect(nummy(12).abbr(-1)).to.equal('10');
            }));
            it('decimal -1 places | 124', wrapDone(function() {
                expect(nummy(124).abbr(-1)).to.equal('120');
            }));
            it('decimal -1 places | 1,249', wrapDone(function() {
                expect(nummy(1249).abbr(-1)).to.equal('0k');
            }));
            it('decimal -1 places | 1,749', wrapDone(function() {
                expect(nummy(1749).abbr(-1)).to.equal('0k');
            }));
            it('decimal -1 places | 12,495', wrapDone(function() {
                expect(nummy(12495).abbr(-1)).to.equal('10k');
            }));
            it('decimal -1 places | 17,495', wrapDone(function() {
                expect(nummy(17495).abbr(-1)).to.equal('20k');
            }));
            it('decimal -1 places | 124,958', wrapDone(function() {
                expect(nummy(124958).abbr(-1)).to.equal('120k');
            }));
            it('decimal -1 places | 174,958', wrapDone(function() {
                expect(nummy(174958).abbr(-1)).to.equal('170k');
            }));
            it('decimal -1 places | 1,249,584', wrapDone(function() {
                expect(nummy(1249584).abbr(-1)).to.equal('0m');
            }));
            it('decimal -1 places | 1,749,584', wrapDone(function() {
                expect(nummy(1749584).abbr(-1)).to.equal('0m');
            }));

            it('0.1', wrapDone(function() {
                expect(nummy(0.1).abbr()).to.equal('0');
            }));
            it('0.01', wrapDone(function() {
                expect(nummy(0.01).abbr()).to.equal('0');
            }));
            it('0.001', wrapDone(function() {
                expect(nummy(0.001).abbr()).to.equal('0');
            }));
            it('0.00001', wrapDone(function() {
                expect(nummy(0.0001).abbr()).to.equal('0');
            }));
            it('0.000001', wrapDone(function() {
                expect(nummy(0.00001).abbr()).to.equal('0');
            }));
            it('0.0000001', wrapDone(function() {
                expect(nummy(0.000001).abbr()).to.equal('0');
            }));
            it('0.00000001', wrapDone(function() {
                expect(nummy(0.0000001).abbr()).to.equal('0');
            }));
            it('0.000000001', wrapDone(function() {
                expect(nummy(0.00000001).abbr()).to.equal('0');
            }));

            it('1.1', wrapDone(function() {
                expect(nummy(1.1).abbr()).to.equal('1');
            }));
            it('1.01', wrapDone(function() {
                expect(nummy(1.01).abbr()).to.equal('1');
            }));
            it('1.001', wrapDone(function() {
                expect(nummy(1.001).abbr()).to.equal('1');
            }));
            it('1.00001', wrapDone(function() {
                expect(nummy(1.0001).abbr()).to.equal('1');
            }));
            it('1.000001', wrapDone(function() {
                expect(nummy(1.00001).abbr()).to.equal('1');
            }));
            it('1.0000001', wrapDone(function() {
                expect(nummy(1.000001).abbr()).to.equal('1');
            }));
            it('1.00000001', wrapDone(function() {
                expect(nummy(1.0000001).abbr()).to.equal('1');
            }));
            it('1.000000001', wrapDone(function() {
                expect(nummy(1.00000001).abbr()).to.equal('1');
            }));

            it('1000.004', wrapDone(function() {
                expect(nummy(1000.004).abbr()).to.equal('1k');
            }));
            it('10,000.004', wrapDone(function() {
                expect(nummy(10000.004).abbr()).to.equal('10k');
            }));
            it('100,000.004', wrapDone(function() {
                expect(nummy(100000.004).abbr()).to.equal('100k');
            }));
            it('1,000,000.004', wrapDone(function() {
                expect(nummy(1000000.004).abbr()).to.equal('1m');
            }));

            it('2 places | 1000.004', wrapDone(function() {
                expect(nummy(1000.004).abbr(2)).to.equal('1k');
            }));
            it('2 places | 10,000.004', wrapDone(function() {
                expect(nummy(10000.004).abbr(2)).to.equal('10k');
            }));
            it('2 places | 100,000.004', wrapDone(function() {
                expect(nummy(100000.004).abbr(2)).to.equal('100k');
            }));
            it('2 places | 1,000,000.004', wrapDone(function() {
                expect(nummy(1000000.004).abbr(2)).to.equal('1m');
            }));
        });

        describe('#base36', function () {
            function pad(a, b) { a = ""+a; return (1e15+a).slice(-((a.length > b) ? a.length : b)); }
            _.each([
                [Math.pow(nummy.random(5, 9), nummy.random(0, 5)), 0],
                [22, 2],
                [Math.pow(3, 6), 4],
                [Math.pow(2, 16), 8],
                [nummy.random(200, 10000), nummy.random(0, 10)],
                [Infinity, nummy.random(0, 10)],
                [NaN, nummy.random(0, 10)]
            ], function (values) {
                var expected = pad(values[0].toString(36).toUpperCase(), values[1]);
                if (_.anyNaN.apply(null, values) || _.anyInfinite.apply(null, values)) {
                    expected = String(values[0]);
                }
                it(printf('of %s padded to %s is %s', values[0], values[1], expected), wrapDone(function () {
                    var nummied = nummy().base36(values[0], values[1]);
                    expect(nummied).to.equal(expected, nummied);
                }));
            });
        });

        describe('#binary', function () {
            function pad(a, b, c) { c = (1e15+"").slice(1); a = ""+a; return (c+c+a).slice(-((a.length > b) ? a.length : b)); }
            _.each([
                [Math.pow(nummy.random(5, 9), nummy.random(0, 5)), 0],
                [22, 10],
                [Math.pow(3, 6), 16],
                [Math.pow(2, 16), 8],
                [nummy.random(200, 10000), nummy.random(0, 10)],
                [Infinity, nummy.random(0, 10)],
                [NaN, nummy.random(0, 10)]
            ], function (values) {
                var expected = pad(values[0].toString(2), values[1]);
                if (_.anyNaN.apply(null, values) || _.anyInfinite.apply(null, values)) {
                    expected = String(values[0]);
                }
                it(printf('of %s padded to %s is %s', values[0], values[1], expected), wrapDone(function () {
                    var nummied = nummy(values[0]).binary(values[1]);
                    expect(nummied).to.equal(expected, nummied);
                }));
            });
        });

        describe('#bytes', function () {
            it('1B', wrapDone(function() {
                expect(nummy(1).bytes()).to.equal('1B');
            }));
            it('10B', wrapDone(function() {
                expect(nummy(10).bytes()).to.equal('10B');
            }));
            it('100B', wrapDone(function() {
                expect(nummy(100).bytes()).to.equal('100B');
            }));
            it('1kB', wrapDone(function() {
                expect(nummy(1000).bytes()).to.equal('1kB');
            }));
            it('10kB', wrapDone(function() {
                expect(nummy(10000).bytes()).to.equal('10kB');
            }));
            it('100kB', wrapDone(function() {
                expect(nummy(100000).bytes()).to.equal('98kB');
            }));
            it('1MB', wrapDone(function() {
                expect(nummy(1000000).bytes()).to.equal('1MB');
            }));
            it('10MB', wrapDone(function() {
                expect(nummy(10000000).bytes()).to.equal('10MB');
            }));
            it('100MB', wrapDone(function() {
                expect(nummy(100000000).bytes()).to.equal('95MB');
            }));
            it('1GB', wrapDone(function() {
                expect(nummy().bytes(1000000000, 0, 4)).to.equal('1GB');
            }));
            it('10GB', wrapDone(function() {
                expect(nummy(10000000000).bytes()).to.equal('9GB');
            }));
            it('100GB', wrapDone(function() {
                expect(nummy(100000000000).bytes()).to.equal('93GB');
            }));
            it('1TB', wrapDone(function() {
                expect(nummy(1000000000000).bytes()).to.equal('1TB');
            }));
            it('10TB', wrapDone(function() {
                expect(nummy(10000000000000).bytes()).to.equal('9TB');
            }));
            it('100TB', wrapDone(function() {
                expect(nummy(100000000000000).bytes()).to.equal('91TB');
            }));
            it('1,000TB', wrapDone(function() {
                expect(nummy(1000000000000000).bytes()).to.equal('909TB');
            }));
            it('10,000TB', wrapDone(function() {
                expect(nummy(10000000000000000).bytes()).to.equal('9,095TB');
            }));
            it('10,000TB', wrapDone(function() {
                expect(nummy(100000000000000000).bytes()).to.equal('90,949TB');
            }));

            it('no limit | 1B', wrapDone(function() {
                expect(nummy(1).bytes(0, false)).to.equal('1B');
            }));
            it('no limit | 10B', wrapDone(function() {
                expect(nummy(10).bytes(0, false)).to.equal('10B');
            }));
            it('no limit | 100B', wrapDone(function() {
                expect(nummy(100).bytes(0, false)).to.equal('100B');
            }));
            it('no limit | 1kB', wrapDone(function() {
                expect(nummy(1000).bytes(0, false)).to.equal('1kB');
            }));
            it('no limit | 10kB', wrapDone(function() {
                expect(nummy(10000).bytes(0, false)).to.equal('10kB');
            }));
            it('no limit | 100kB', wrapDone(function() {
                expect(nummy(100000).bytes(0, false)).to.equal('98kB');
            }));
            it('no limit | 1MB', wrapDone(function() {
                expect(nummy(1000000).bytes(0, false)).to.equal('1MB');
            }));
            it('no limit | 10MB', wrapDone(function() {
                expect(nummy(10000000).bytes(0, false)).to.equal('10MB');
            }));
            it('no limit | 100MB', wrapDone(function() {
                expect(nummy(100000000).bytes(0, false)).to.equal('95MB');
            }));
            it('no limit | 1GB', wrapDone(function() {
                expect(nummy(1000000000).bytes(0, false)).to.equal('1GB');
            }));
            it('no limit | 10GB', wrapDone(function() {
                expect(nummy(10000000000).bytes(0, false)).to.equal('9GB');
            }));
            it('no limit | 100GB', wrapDone(function() {
                expect(nummy(100000000000).bytes(0, false)).to.equal('93GB');
            }));
            it('no limit | 1TB', wrapDone(function() {
                expect(nummy(1000000000000).bytes(0, false)).to.equal('1TB');
            }));
            it('no limit | 10TB', wrapDone(function() {
                expect(nummy(10000000000000).bytes(0, false)).to.equal('9TB');
            }));
            it('no limit | 100TB', wrapDone(function() {
                expect(nummy(100000000000000).bytes(0, false)).to.equal('91TB');
            }));
            it('no limit | 1,000TB', wrapDone(function() {
                expect(nummy(1000000000000000).bytes(0, false)).to.equal('1PB');
            }));
            it('no limit | 10,000TB', wrapDone(function() {
                expect(nummy(10000000000000000).bytes(0, false)).to.equal('9PB');
            }));
            it('no limit | 10,000TB', wrapDone(function() {
                expect(nummy(100000000000000000).bytes(0, false)).to.equal('89PB');
            }));

            it('no limit, 2 places | 1B', wrapDone(function() {
                expect(nummy(1).bytes(2, false)).to.equal('1B');
            }));
            it('no limit, 2 places | 10B', wrapDone(function() {
                expect(nummy(10).bytes(2, false)).to.equal('10B');
            }));
            it('no limit, 2 places | 100B', wrapDone(function() {
                expect(nummy(100).bytes(2, false)).to.equal('100B');
            }));
            it('no limit, 2 places | 1kB', wrapDone(function() {
                expect(nummy(1000).bytes(2, false)).to.equal('0.98kB');
            }));
            it('no limit, 2 places | 10kB', wrapDone(function() {
                expect(nummy(10000).bytes(2, false)).to.equal('9.77kB');
            }));
            it('no limit, 2 places | 100kB', wrapDone(function() {
                expect(nummy(100000).bytes(2, false)).to.equal('97.66kB');
            }));
            it('no limit, 2 places | 1MB', wrapDone(function() {
                expect(nummy(1000000).bytes(2, false)).to.equal('0.95MB');
            }));
            it('no limit, 2 places | 10MB', wrapDone(function() {
                expect(nummy(10000000).bytes(2, false)).to.equal('9.54MB');
            }));
            it('no limit, 2 places | 100MB', wrapDone(function() {
                expect(nummy(100000000).bytes(2, false)).to.equal('95.37MB');
            }));
            it('no limit, 2 places | 1GB', wrapDone(function() {
                expect(nummy(1000000000).bytes(2, false)).to.equal('0.93GB');
            }));
            it('no limit, 2 places | 10GB', wrapDone(function() {
                expect(nummy(10000000000).bytes(2, false)).to.equal('9.31GB');
            }));
            it('no limit, 2 places | 100GB', wrapDone(function() {
                expect(nummy(100000000000).bytes(2, false)).to.equal('93.13GB');
            }));
            it('no limit, 2 places | 1TB', wrapDone(function() {
                expect(nummy(1000000000000).bytes(2, false)).to.equal('0.91TB');
            }));
            it('no limit, 2 places | 10TB', wrapDone(function() {
                expect(nummy(10000000000000).bytes(2, false)).to.equal('9.09TB');
            }));
            it('no limit, 2 places | 100TB', wrapDone(function() {
                expect(nummy(100000000000000).bytes(2, false)).to.equal('90.95TB');
            }));
            it('no limit, 2 places | 1,000TB', wrapDone(function() {
                expect(nummy(1000000000000000).bytes(2, false)).to.equal('0.89PB');
            }));
            it('no limit, 2 places | 10,000TB', wrapDone(function() {
                expect(nummy(10000000000000000).bytes(2, false)).to.equal('8.88PB');
            }));
            it('no limit, 2 places | 10,000TB', wrapDone(function() {
                expect(nummy(100000000000000000).bytes(2, false)).to.equal('88.82PB');
            }));

            it('1024 bytes is 1kB', wrapDone(function() {
                expect(nummy(1024).bytes()).to.equal('1kB');
            }));
            it('2 places | 1024 bytes is 1kB', wrapDone(function() {
                expect(nummy(1024).bytes(2)).to.equal('1kB');
            }));
            it('2 places | 1048576 bytes is 1MB', wrapDone(function() {
                expect(nummy(1048576).bytes()).to.equal('1MB');
            }));
            it('2 places | 1048576 bytes is 1MB', wrapDone(function() {
                expect(nummy(1048576).bytes(2)).to.equal('1MB');
            }));

            it('10 ^ 16 bytes', wrapDone(function() {
                expect(nummy(nummy(10).pow(16)).bytes()).to.equal('9,095TB');
            }));
            it('10 ^ 16 bytes | -2 places', wrapDone(function() {
            expect(nummy(nummy(10).pow(16)).bytes(-2)).to.equal('9,100TB');
            }));
        });

        describe('#chr', function () {
            it('65', wrapDone(function() {
                expect(nummy(65).chr()).to.equal('A');
            }));
            it('24536', wrapDone(function() {
                expect(nummy(24536).chr()).to.equal('忘');
            }));
            it('20294', wrapDone(function() {
                expect(nummy(20294).chr()).to.equal('但');
            }));
        });

        describe('#format', function () {
            it('100', wrapDone(function() {
                expect(nummy(100).format()).to.equal('100');
            }));
            it('1', wrapDone(function() {
                expect(nummy(1).format()).to.equal('1');
            }));
            it('10', wrapDone(function() {
                expect(nummy(10).format()).to.equal('10');
            }));
            it('1,000', wrapDone(function() {
                expect(nummy(1000).format()).to.equal('1,000');
            }));
            it('10,000', wrapDone(function() {
                expect(nummy(10000).format()).to.equal('10,000');
            }));
            it('100,000', wrapDone(function() {
                expect(nummy(100000).format()).to.equal('100,000');
            }));
            it('1,000,000', wrapDone(function() {
                expect(nummy(1000000).format()).to.equal('1,000,000');
            }));
            it('1,000,000.01', wrapDone(function() {
                expect(nummy(1000000.01).format()).to.equal('1,000,000.01');
            }));
            it('-100', wrapDone(function() {
                expect(nummy(-100).format()).to.equal('-100');
            }));
            it('-1', wrapDone(function() {
                expect(nummy(-1).format()).to.equal('-1');
            }));
            it('-1,000', wrapDone(function() {
                expect(nummy(-1000).format()).to.equal('-1,000');
            }));
            it('-1,000,000.01', wrapDone(function() {
                expect(nummy(-1000000.01).format()).to.equal('-1,000,000.01');
            }));

            it('0.52', wrapDone(function() {
                expect(nummy(0.52).format()).to.equal('0.52');
            }));

            // These discrepancies are due to floating point variable limitations.
            it('100,046,546,510,000', wrapDone(function() {
                expect(nummy(100046546510000.022435451).format().replace(/\.\d+$/,'')).to.equal('100,046,546,510,000');

            }));
            it('-100,046,546,510,000', wrapDone(function() {
                expect(nummy(-100046546510000.022435451).format().replace(/\.\d+$/,'')).to.equal('-100,046,546,510,000');

            }));

            it('1000', wrapDone(function() {
                expect(nummy(1000).format({place: null, thousands: ' '})).to.equal('1 000');
            }));
            it('larger number', wrapDone(function() {
                expect(nummy(1532587).format({place: null, thousands: ' '})).to.equal('1 532 587');
            }));
            it(',', wrapDone(function() {
                expect(nummy(1532587.5752).format({place: null, thousands: ' ', decimal: ','})).to.equal('1 532 587,5752');
            }));
            it('Standard', wrapDone(function() {
                expect(nummy(9999999.99).format()).to.equal('9,999,999.99');
            }));
            it('Euro style!', wrapDone(function() {
                expect(nummy(9999999.99).format({place: null, thousands: '.', decimal: ','})).to.equal('9.999.999,99');
            }));
            it('empty string', wrapDone(function() {
                expect(nummy(9999999.99).format({place: null, thousands: ''})).to.equal('9999999.99');
            }));
            it('no punctuation', wrapDone(function() {
                expect(nummy(9999999.99).format({place: null, thousands: '', decimal: ''})).to.equal('999999999');
            }));

            it('to 2 places', wrapDone(function() {
                expect(nummy(1).format({place: 2})).to.equal('1.00');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(10).format({place: 2})).to.equal('10.00');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(100).format({place: 2})).to.equal('100.00');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(1000).format({place: 2})).to.equal('1,000.00');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(10000).format({place: 2})).to.equal('10,000.00');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(100000).format({place: 2})).to.equal('100,000.00');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(1000000).format({place: 2})).to.equal('1,000,000.00');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(1).format({place: 4})).to.equal('1.0000');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(10).format({place: 4})).to.equal('10.0000');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(100).format({place: 4})).to.equal('100.0000');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(1000).format({place: 4})).to.equal('1,000.0000');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(10000).format({place: 4})).to.equal('10,000.0000');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(100000).format({place: 4})).to.equal('100,000.0000');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(1000000).format({place: 4})).to.equal('1,000,000.0000');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(-1).format({place: 2})).to.equal('-1.00');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(-10).format({place: 2})).to.equal('-10.00');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(-100).format({place: 2})).to.equal('-100.00');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(-1000).format({place: 2})).to.equal('-1,000.00');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(-10000).format({place: 2})).to.equal('-10,000.00');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(-100000).format({place: 2})).to.equal('-100,000.00');
            }));
            it('to 2 places', wrapDone(function() {
                expect(nummy(-1000000).format({place: 2})).to.equal('-1,000,000.00');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(-1).format({place: 4})).to.equal('-1.0000');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(-10).format({place: 4})).to.equal('-10.0000');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(-100).format({place: 4})).to.equal('-100.0000');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(-1000).format({place: 4})).to.equal('-1,000.0000');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(-10000).format({place: 4})).to.equal('-10,000.0000');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(-100000).format({place: 4})).to.equal('-100,000.0000');
            }));
            it('to 4 places', wrapDone(function() {
                expect(nummy(-1000000).format({place: 4})).to.equal('-1,000,000.0000');
            }));

            it('2.44', wrapDone(function() {
                expect(nummy(2.435).format({place: 2})).to.equal('2.44');
            }));
            it('553,599.44', wrapDone(function() {
                expect(nummy(553599.435).format({place: 2})).to.equal('553,599.44');
            }));
            it('553,599.4', wrapDone(function() {
                expect(nummy(553599.435).format({place: 1})).to.equal('553,599.4');
            }));
            it('553,599', wrapDone(function() {
                expect(nummy(553599.435).format({place: 0})).to.equal('553,599');
            }));
            it('553,600', wrapDone(function() {
                expect(nummy(553599.435).format({place: -1})).to.equal('553,600');
            }));
            it('553,600', wrapDone(function() {
                expect(nummy(553599.435).format({place: -2})).to.equal('553,600');
            }));
            it('553,600', wrapDone(function() {
                expect(nummy(553599.435).format({place: -3})).to.equal('554,000');
            }));
            it('550,000', wrapDone(function() {
                expect(nummy(553599.435).format({place: -4})).to.equal('550,000');
            }));
            it('600,000', wrapDone(function() {
                expect(nummy(553599.435).format({place: -5})).to.equal('600,000');
            }));
        });

        describe('#hex', function () {
            it('0', wrapDone(function() {
                expect(nummy(0).hex()).to.equal('0');
            }));
            it('10', wrapDone(function() {
                expect(nummy(10).hex()).to.equal('A');
            }));
            it('255', wrapDone(function() {
                expect(nummy(255).hex()).to.equal('FF');
            }));
            it('0.5', wrapDone(function() {
                expect(nummy(0.5).hex()).to.equal('0.8');
            }));
            it('2.8', wrapDone(function() {
                expect(nummy(2.5).hex()).to.equal('2.8');
            }));
            it('2553423', wrapDone(function() {
                expect(nummy(2553423).hex()).to.equal('26F64F');
            }));

            it('padding 2 places | 0', wrapDone(function() {
                expect(nummy(0).hex(2)).to.equal('00');
            }));
            it('padding 2 places | 10', wrapDone(function() {
                expect(nummy(10).hex(2)).to.equal('0A');
            }));
            it('padding 2 places | 10', wrapDone(function() {
                expect(nummy(255).hex(2)).to.equal('FF');
            }));
            it('padding 2 places | 0.5', wrapDone(function() {
                expect(nummy(0.5).hex(2)).to.equal('00.8');
            }));
            it('padding 2 places | 2.8', wrapDone(function() {
                expect(nummy(2.5).hex(2)).to.equal('02.8');
            }));

            it('padding 4 places | 0', wrapDone(function() {
                expect(nummy(0).hex(4)).to.equal('0000');
            }));
            it('padding 4 places | 10', wrapDone(function() {
                expect(nummy(10).hex(4)).to.equal('000A');
            }));
            it('padding 4 places | 10', wrapDone(function() {
                expect(nummy(255).hex(4)).to.equal('00FF');
            }));
            it('padding 4 places | 0.5', wrapDone(function() {
                expect(nummy(0.5).hex(4)).to.equal('0000.8');
            }));
            it('padding 4 places | 2.8', wrapDone(function() {
                expect(nummy(2.5).hex(4)).to.equal('0002.8');
            }));
        });

        describe('#metric', function () {
            it('1', wrapDone(function() {
                expect(nummy(1).metric(0, false)).to.equal('1');
            }));
            it('10', wrapDone(function() {
                expect(nummy(10).metric(0, false)).to.equal('10');
            }));
            it('100', wrapDone(function() {
                expect(nummy(100).metric(0, false)).to.equal('100');
            }));
            it('1,000', wrapDone(function() {
                expect(nummy(1000).metric(0, false)).to.equal('1k');
            }));
            it('10,000', wrapDone(function() {
                expect(nummy(10000).metric(0, false)).to.equal('10k');
            }));
            it('100,000', wrapDone(function() {
                expect(nummy(100000).metric(0, false)).to.equal('100k');
            }));
            it('1,000,000', wrapDone(function() {
                expect(nummy(1000000).metric(0, false)).to.equal('1M');
            }));
            it('10,000,000', wrapDone(function() {
                expect(nummy(10000000).metric(0, false)).to.equal('10M');
            }));
            it('100,000,000', wrapDone(function() {
                expect(nummy(100000000).metric(0, false)).to.equal('100M');
            }));
            it('1,000,000,000', wrapDone(function() {
                expect(nummy(1000000000).metric(0, false)).to.equal('1G');
            }));
            it('10,000,000,000', wrapDone(function() {
                expect(nummy(10000000000).metric(0, false)).to.equal('10G');
            }));
            it('100,000,000,000', wrapDone(function() {
                expect(nummy(100000000000).metric(0, false)).to.equal('100G');
            }));
            it('10,000,000,000,000', wrapDone(function() {
                expect(nummy(1000000000000).metric(0, false)).to.equal('1T');
            }));
            it('100,000,000,000,000', wrapDone(function() {
                expect(nummy(10000000000000).metric(0, false)).to.equal('10T');
            }));
            it('1,000,000,000,000,000', wrapDone(function() {
                expect(nummy(100000000000000).metric(0, false)).to.equal('100T');
            }));
            it('10,000,000,000,000,000', wrapDone(function() {
                expect(nummy(1000000000000000).metric(0, false)).to.equal('1P');
            }));
            it('100,000,000,000,000,000', wrapDone(function() {
                expect(nummy(10000000000000000).metric(0, false)).to.equal('10P');
            }));
            it('1,000,000,000,000,000,000', wrapDone(function() {
                expect(nummy(100000000000000000).metric(0, false)).to.equal('100P');
            }));

            it('decimal | 1', wrapDone(function() {
                expect(nummy(1).metric(0, false)).to.equal('1');
            }));
            it('decimal | 12', wrapDone(function() {
                expect(nummy(12).metric(0, false)).to.equal('12');
            }));
            it('decimal | 124', wrapDone(function() {
                expect(nummy(124).metric(0, false)).to.equal('124');
            }));
            it('decimal | 1,249', wrapDone(function() {
                expect(nummy(1249).metric(0, false)).to.equal('1k');
            }));
            it('decimal | 1,749', wrapDone(function() {
                expect(nummy(1749).metric(0, false)).to.equal('2k');
            }));
            it('decimal | 12,495', wrapDone(function() {
                expect(nummy(12495).metric(0, false)).to.equal('12k');
            }));
            it('decimal | 17,495', wrapDone(function() {
                expect(nummy(17495).metric(0, false)).to.equal('17k');
            }));
            it('decimal | 124,958', wrapDone(function() {
                expect(nummy(124958).metric(0, false)).to.equal('125k');
            }));
            it('decimal | 174,958', wrapDone(function() {
                expect(nummy(174958).metric(0, false)).to.equal('175k');
            }));
            it('decimal | 1,249,584', wrapDone(function() {
                expect(nummy(1249584).metric(0, false)).to.equal('1M');
            }));
            it('decimal | 1,749,584', wrapDone(function() {
                expect(nummy(1749584).metric(0, false)).to.equal('2M');
            }));
            it('decimal | 1,249,584,000', wrapDone(function() {
                expect(nummy(1249584000).metric(0, false)).to.equal('1G');
            }));
            it('decimal | 1,749,584,000', wrapDone(function() {
                expect(nummy(1749584000).metric(0, false)).to.equal('2G');
            }));

            it('decimal 1 place | 1', wrapDone(function() {
                expect(nummy(1).metric(1, false)).to.equal('1');
            }));
            it('decimal 1 place | 12', wrapDone(function() {
                expect(nummy(12).metric(1, false)).to.equal('12');
            }));
            it('decimal 1 place | 124', wrapDone(function() {
                expect(nummy(124).metric(1, false)).to.equal('124');
            }));
            it('decimal 1 place | 1,249', wrapDone(function() {
                expect(nummy(1249).metric(1, false)).to.equal('1.2k');
            }));
            it('decimal 1 place | 1,749', wrapDone(function() {
                expect(nummy(1749).metric(1, false)).to.equal('1.7k');
            }));
            it('decimal 1 place | 12,495', wrapDone(function() {
                expect(nummy(12495).metric(1, false)).to.equal('12.5k');
            }));
            it('decimal 1 place | 17,495', wrapDone(function() {
                expect(nummy(17495).metric(1, false)).to.equal('17.5k');
            }));
            it('decimal 1 place | 124,958', wrapDone(function() {
                expect(nummy(124958).metric(1, false)).to.equal('125k');
            }));
            it('decimal 1 place | 174,958', wrapDone(function() {
                expect(nummy(174958).metric(1, false)).to.equal('175k');
            }));
            it('decimal 1 place | 1,249,584', wrapDone(function() {
                expect(nummy(1249584).metric(1, false)).to.equal('1.2M');
            }));
            it('decimal 1 place | 1,749,584', wrapDone(function() {
                expect(nummy(1749584).metric(1, false)).to.equal('1.7M');
            }));
            it('decimal 1 place | 1,249,584,000', wrapDone(function() {
                expect(nummy(1249584000).metric(1, false)).to.equal('1.2G');
            }));
            it('decimal 1 place | 1,749,584,000', wrapDone(function() {
                expect(nummy(1749584000).metric(1, false)).to.equal('1.7G');
            }));

            it('decimal 2 places | 1', wrapDone(function() {
                expect(nummy(1).metric(2, false)).to.equal('1');
            }));
            it('decimal 2 places | 12', wrapDone(function() {
                expect(nummy(12).metric(2, false)).to.equal('12');
            }));
            it('decimal 2 places | 124', wrapDone(function() {
                expect(nummy(124).metric(2, false)).to.equal('124');
            }));
            it('decimal 2 places | 1,249', wrapDone(function() {
                expect(nummy(1249).metric(2, false)).to.equal('1.25k');
            }));
            it('decimal 2 places | 1,749', wrapDone(function() {
                expect(nummy(1749).metric(2, false)).to.equal('1.75k');
            }));
            it('decimal 2 places | 12,495', wrapDone(function() {
                expect(nummy(12495).metric(2, false)).to.equal('12.5k');
            }));
            it('decimal 2 places | 17,495', wrapDone(function() {
                expect(nummy(17495).metric(2, false)).to.equal('17.5k');
            }));
            it('decimal 2 places | 124,958', wrapDone(function() {
                expect(nummy(124958).metric(2, false)).to.equal('124.96k');
            }));
            it('decimal 2 places | 174,958', wrapDone(function() {
                expect(nummy(174958).metric(2, false)).to.equal('174.96k');
            }));
            it('decimal 2 places | 1,249,584', wrapDone(function() {
                expect(nummy(1249584).metric(2, false)).to.equal('1.25M');
            }));
            it('decimal 2 places | 1,749,584', wrapDone(function() {
                expect(nummy(1749584).metric(2, false)).to.equal('1.75M');
            }));
            it('decimal 2 places | 1,249,584,000', wrapDone(function() {
                expect(nummy(1249584000).metric(2, false)).to.equal('1.25G');
            }));
            it('decimal 2 places | 1,749,584,000', wrapDone(function() {
                expect(nummy(1749584000).metric(2, false)).to.equal('1.75G');
            }));

            it('decimal 3 places | 1', wrapDone(function() {
                expect(nummy(1).metric(3, false)).to.equal('1');
            }));
            it('decimal 3 places | 12', wrapDone(function() {
                expect(nummy(12).metric(3, false)).to.equal('12');
            }));
            it('decimal 3 places | 124', wrapDone(function() {
                expect(nummy(124).metric(3, false)).to.equal('124');
            }));
            it('decimal 3 places | 1,249', wrapDone(function() {
                expect(nummy(1249).metric(3, false)).to.equal('1.249k');
            }));
            it('decimal 3 places | 1,749', wrapDone(function() {
                expect(nummy(1749).metric(3, false)).to.equal('1.749k');
            }));
            it('decimal 3 places | 12,495', wrapDone(function() {
                expect(nummy(12495).metric(3, false)).to.equal('12.495k');
            }));
            it('decimal 3 places | 17,495', wrapDone(function() {
                expect(nummy(17495).metric(3, false)).to.equal('17.495k');
            }));
            it('decimal 3 places | 124,958', wrapDone(function() {
                expect(nummy(124958).metric(3, false)).to.equal('124.958k');
            }));
            it('decimal 3 places | 174,958', wrapDone(function() {
                expect(nummy(174958).metric(3, false)).to.equal('174.958k');
            }));
            it('decimal 3 places | 1,249,584', wrapDone(function() {
                expect(nummy(1249584).metric(3, false)).to.equal('1.25M');
            }));
            it('decimal 3 places | 1,749,584', wrapDone(function() {
                expect(nummy(1749584).metric(3, false)).to.equal('1.75M');
            }));
            it('decimal 3 places | 1,249,584,000', wrapDone(function() {
                expect(nummy(1249584000).metric(3, false)).to.equal('1.25G');
            }));
            it('decimal 3 places | 1,749,584,000', wrapDone(function() {
                expect(nummy(1749584000).metric(3, false)).to.equal('1.75G');
            }));


            it('decimal -1 places | 1', wrapDone(function() {
                expect(nummy(1).metric(-1, false)).to.equal('0');
            }));
            it('decimal -1 places | 12', wrapDone(function() {
                expect(nummy(12).metric(-1, false)).to.equal('10');
            }));
            it('decimal -1 places | 124', wrapDone(function() {
                expect(nummy(124).metric(-1, false)).to.equal('120');
            }));
            it('decimal -1 places | 1,249', wrapDone(function() {
                expect(nummy(1249).metric(-1, false)).to.equal('0k');
            }));
            it('decimal -1 places | 1,749', wrapDone(function() {
                expect(nummy(1749).metric(-1, false)).to.equal('0k');
            }));
            it('decimal -1 places | 12,495', wrapDone(function() {
                expect(nummy(12495).metric(-1, false)).to.equal('10k');
            }));
            it('decimal -1 places | 17,495', wrapDone(function() {
                expect(nummy(17495).metric(-1, false)).to.equal('20k');
            }));
            it('decimal -1 places | 124,958', wrapDone(function() {
                expect(nummy(124958).metric(-1, false)).to.equal('120k');
            }));
            it('decimal -1 places | 174,958', wrapDone(function() {
                expect(nummy(174958).metric(-1, false)).to.equal('170k');
            }));
            it('decimal -1 places | 1,249,584', wrapDone(function() {
                expect(nummy(1249584).metric(-1, false)).to.equal('0M');
            }));
            it('decimal -1 places | 1,749,584', wrapDone(function() {
                expect(nummy(1749584).metric(-1, false)).to.equal('0M');
            }));
            it('decimal -1 places | 1,249,584,000', wrapDone(function() {
                expect(nummy(1249584000).metric(-1, false)).to.equal('0G');
            }));
            it('decimal -1 places | 1,749,584,000', wrapDone(function() {
                expect(nummy(1749584000).metric(-1, false)).to.equal('0G');
            }));

            it('fractional | 0.1', wrapDone(function() {
                expect(nummy(0.1000000000000).metric()).to.equal('100m');
            }));
            it('fractional | 0.01', wrapDone(function() {
                expect(nummy(0.0100000000000).metric()).to.equal('10m');
            }));
            it('fractional | 0.001', wrapDone(function() {
                expect(nummy(0.0010000000000).metric()).to.equal('1m');
            }));
            it('fractional | 0.0001', wrapDone(function() {
                expect(nummy(0.0001000000000).metric()).to.equal('100μ');
            }));
            it('fractional | 0.00001', wrapDone(function() {
                expect(nummy(0.0000100000000).metric()).to.equal('10μ');
            }));
            it('fractional | 0.000001', wrapDone(function() {
                expect(nummy(0.0000010000000).metric()).to.equal('1μ');
            }));
            it('fractional | 0.0000001', wrapDone(function() {
                expect(nummy(0.0000001000000).metric()).to.equal('100n');
            }));
            it('fractional | 0.00000001', wrapDone(function() {
                expect(nummy(0.0000000100000).metric()).to.equal('10n');
            }));
            it('fractional | 0.000000001', wrapDone(function() {
                expect(nummy(0.0000000010000).metric()).to.equal('1n');
            }));
            it('fractional | 0.0000000001', wrapDone(function() {
                expect(nummy(0.0000000001000).metric()).to.equal('0.1n');
            }));
            it('fractional | 0.00000000001', wrapDone(function() {
                expect(nummy(0.0000000000100).metric()).to.equal('0.01n');
            }));
            it('fractional | 0.000000000001', wrapDone(function() {
                expect(nummy(0.0000000000010).metric()).to.equal('0.001n');
            }));
            it('fractional | 0.0000000000001', wrapDone(function() {
                expect(nummy(0.0000000000001).metric()).to.equal('0.0001n');
            }));

            it('fractional | 0 places | 0.1111111111111', wrapDone(function() {
                expect(nummy(0.1111111111111).metric()).to.equal('111m');
            }));
            it('fractional | 0 places | 0.0111111111111', wrapDone(function() {
                expect(nummy(0.0111111111111).metric()).to.equal('11m');
            }));
            it('fractional | 0 places | 0.0011111111111', wrapDone(function() {
                expect(nummy(0.0011111111111).metric()).to.equal('1m');
            }));
            it('fractional | 0 places | 0.0001111111111', wrapDone(function() {
                expect(nummy(0.0001111111111).metric()).to.equal('111μ');
            }));
            it('fractional | 0 places | 0.0000111111111', wrapDone(function() {
                expect(nummy(0.0000111111111).metric()).to.equal('11μ');
            }));
            it('fractional | 0 places | 0.0000011111111', wrapDone(function() {
                expect(nummy(0.0000011111111).metric()).to.equal('1μ');
            }));
            it('fractional | 0 places | 0.0000001111111', wrapDone(function() {
                expect(nummy(0.0000001111111).metric()).to.equal('111n');
            }));
            it('fractional | 0 places | 0.0000000111111', wrapDone(function() {
                expect(nummy(0.0000000111111).metric()).to.equal('11n');
            }));
            it('fractional | 0 places | 0.0000000011111', wrapDone(function() {
                expect(nummy(0.0000000011111).metric()).to.equal('1n');
            }));
            it('fractional | 0 places | 0.0000000001111', wrapDone(function() {
                expect(nummy(0.0000000001111).metric()).to.equal('0.1n');
            }));
            it('fractional | 0 places | 0.0000000000111', wrapDone(function() {
                expect(nummy(0.0000000000111).metric()).to.equal('0.01n');
            }));
            it('fractional | 0 places | 0.0000000000011', wrapDone(function() {
                expect(nummy(0.0000000000011).metric()).to.equal('0.001n');
            }));
            it('fractional | 0 places | 0.0000000000001', wrapDone(function() {
                expect(nummy(0.0000000000001).metric()).to.equal('0.0001n');
            }));

            it('fractional | 2 places | 0.1111111111111', wrapDone(function() {
                expect(nummy(0.1111111111111).metric(2, false)).to.equal('111.11m');
            }));
            it('fractional | 2 places | 0.0111111111111', wrapDone(function() {
                expect(nummy(0.0111111111111).metric(2, false)).to.equal('11.11m');
            }));
            it('fractional | 2 places | 0.0011111111111', wrapDone(function() {
                expect(nummy(0.0011111111111).metric(2, false)).to.equal('1.11m');
            }));
            it('fractional | 2 places | 0.0001111111111', wrapDone(function() {
                expect(nummy(0.0001111111111).metric(2, false)).to.equal('111.11μ');
            }));
            it('fractional | 2 places | 0.0000111111111', wrapDone(function() {
                expect(nummy(0.0000111111111).metric(2, false)).to.equal('11.11μ');
            }));
            it('fractional | 2 places | 0.0000011111111', wrapDone(function() {
                expect(nummy(0.0000011111111).metric(2, false)).to.equal('1.11μ');
            }));
            it('fractional | 2 places | 0.0000001111111', wrapDone(function() {
                expect(nummy(0.0000001111111).metric(2, false)).to.equal('111.11n');
            }));
            it('fractional | 2 places | 0.0000000111111', wrapDone(function() {
                expect(nummy(0.0000000111111).metric(2, false)).to.equal('11.11n');
            }));
            it('fractional | 2 places | 0.0000000011111', wrapDone(function() {
                expect(nummy(0.0000000011111).metric(2, false)).to.equal('1.11n');
            }));
            it('fractional | 2 places | 0.0000000001111', wrapDone(function() {
                expect(nummy(0.0000000001111).metric(2, false)).to.equal('0.1n');
            }));
            it('fractional | 2 places | 0.0000000000111', wrapDone(function() {
                expect(nummy(0.0000000000111).metric(2, false)).to.equal('0.01n');
            }));
            it('fractional | 2 places | 0.0000000000011', wrapDone(function() {
                expect(nummy(0.0000000000011).metric(2, false)).to.equal('0.001n');
            }));
            it('fractional | 2 places | 0.0000000000001', wrapDone(function() {
                expect(nummy(0.0000000000001).metric(2, false)).to.equal('0.0001n');
            }));

            it('fractional | 0 places | 1.1111111111111', wrapDone(function() {
                expect(nummy(1.1111111111111).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0111111111111', wrapDone(function() {
                expect(nummy(1.0111111111111).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0011111111111', wrapDone(function() {
                expect(nummy(1.0011111111111).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0001111111111', wrapDone(function() {
                expect(nummy(1.0001111111111).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000111111111', wrapDone(function() {
                expect(nummy(1.0000111111111).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000011111111', wrapDone(function() {
                expect(nummy(1.0000011111111).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000001111111', wrapDone(function() {
                expect(nummy(1.0000001111111).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000000111111', wrapDone(function() {
                expect(nummy(1.0000000111111).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000000011111', wrapDone(function() {
                expect(nummy(1.0000000011111).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000000001111', wrapDone(function() {
                expect(nummy(1.0000000001111).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000000000111', wrapDone(function() {
                expect(nummy(1.0000000000111).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000000000011', wrapDone(function() {
                expect(nummy(1.0000000000011).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000000000001', wrapDone(function() {
                expect(nummy(1.0000000000001).metric()).to.equal('1');
            }));

            it('fractional | 2 places | 1.1111111111111', wrapDone(function() {
                expect(nummy(1.1111111111111).metric(2, false)).to.equal('1.11');
            }));
            it('fractional | 2 places | 1.0111111111111', wrapDone(function() {
                expect(nummy(1.0111111111111).metric(2, false)).to.equal('1.01');
            }));
            it('fractional | 2 places | 1.0011111111111', wrapDone(function() {
                expect(nummy(1.0011111111111).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0001111111111', wrapDone(function() {
                expect(nummy(1.0001111111111).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000111111111', wrapDone(function() {
                expect(nummy(1.0000111111111).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000011111111', wrapDone(function() {
                expect(nummy(1.0000011111111).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000001111111', wrapDone(function() {
                expect(nummy(1.0000001111111).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000000111111', wrapDone(function() {
                expect(nummy(1.0000000111111).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000000011111', wrapDone(function() {
                expect(nummy(1.0000000011111).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000000001111', wrapDone(function() {
                expect(nummy(1.0000000001111).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000000000111', wrapDone(function() {
                expect(nummy(1.0000000000111).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000000000011', wrapDone(function() {
                expect(nummy(1.0000000000011).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000000000001', wrapDone(function() {
                expect(nummy(1.0000000000001).metric(2, false)).to.equal('1');
            }));

            it('fractional | 0 places | 1.1000000000001', wrapDone(function() {
                expect(nummy(1.1000000000001).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0100000000001', wrapDone(function() {
                expect(nummy(1.0100000000001).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0010000000001', wrapDone(function() {
                expect(nummy(1.0010000000001).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0001000000001', wrapDone(function() {
                expect(nummy(1.0001000000001).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000100000001', wrapDone(function() {
                expect(nummy(1.0000100000001).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000010000001', wrapDone(function() {
                expect(nummy(1.0000010000001).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000001000001', wrapDone(function() {
                expect(nummy(1.0000001000001).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000000100001', wrapDone(function() {
                expect(nummy(1.0000000100001).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000000010001', wrapDone(function() {
                expect(nummy(1.0000000010001).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000000001001', wrapDone(function() {
                expect(nummy(1.0000000001001).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000000000101', wrapDone(function() {
                expect(nummy(1.0000000000101).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000000000011', wrapDone(function() {
                expect(nummy(1.0000000000011).metric()).to.equal('1');
            }));
            it('fractional | 0 places | 1.0000000000001', wrapDone(function() {
                expect(nummy(1.0000000000001).metric()).to.equal('1');
            }));

            it('fractional | 2 places | 1.1000000000001', wrapDone(function() {
                expect(nummy(1.1000000000001).metric(2, false)).to.equal('1.1');
            }));
            it('fractional | 2 places | 1.0100000000001', wrapDone(function() {
                expect(nummy(1.0100000000001).metric(2, false)).to.equal('1.01');
            }));
            it('fractional | 2 places | 1.0010000000001', wrapDone(function() {
                expect(nummy(1.0010000000001).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0001000000001', wrapDone(function() {
                expect(nummy(1.0001000000001).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000100000001', wrapDone(function() {
                expect(nummy(1.0000100000001).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000010000001', wrapDone(function() {
                expect(nummy(1.0000010000001).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000001000001', wrapDone(function() {
                expect(nummy(1.0000001000001).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000000100001', wrapDone(function() {
                expect(nummy(1.0000000100001).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000000010001', wrapDone(function() {
                expect(nummy(1.0000000010001).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000000001001', wrapDone(function() {
                expect(nummy(1.0000000001001).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000000000101', wrapDone(function() {
                expect(nummy(1.0000000000101).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000000000011', wrapDone(function() {
                expect(nummy(1.0000000000011).metric(2, false)).to.equal('1');
            }));
            it('fractional | 2 places | 1.0000000000001', wrapDone(function() {
                expect(nummy(1.0000000000001).metric(2, false)).to.equal('1');
            }));

            it('fractional | 3 places | 12334.5880', wrapDone(function() {
                expect(nummy(12334.5880).metric(3, false)).to.equal('12.335k');
            }));
            it('fractional | 0 places | 12334.5880', wrapDone(function() {
                expect(nummy(12334.5880).metric()).to.equal('12k');
            }));
            it('fractional | 9 places | .5885', wrapDone(function() {
                expect(nummy(.588500).metric(9, false)).to.equal('588.5m');
            }));
            it('fractional | 9 places | .580085', wrapDone(function() {
                expect(nummy(.580085).metric(9, false)).to.equal('580.085m');
            }));
            it('fractional | 7 places | .580085', wrapDone(function() {
                expect(nummy(.580085).metric(7, false)).to.equal('580.085m');
            }));
            it('fractional | 5 places | .580085', wrapDone(function() {
                expect(nummy(.580085).metric(5, false)).to.equal('580.085m');
            }));
            it('fractional | 3 places | .580085', wrapDone(function() {
                expect(nummy(.580085).metric(3, false)).to.equal('580.085m');
            }));
            it('fractional | 1 places | .580085', wrapDone(function() {
                expect(nummy(.580085).metric(1, false)).to.equal('580.1m');
            }));


            it('100μm', wrapDone(function() {
                expect(nummy(0.0001).metric() +'m').to.equal('100μm');
            }));
            it('1mm', wrapDone(function() {
                expect(nummy(0.001).metric() +'m').to.equal('1mm');
            }));
            it('10mm', wrapDone(function() {
                expect(nummy(0.01).metric() +'m').to.equal('10mm');
            }));
            it('100mm', wrapDone(function() {
                expect(nummy(0.1).metric() +'m').to.equal('100mm');
            }));
            it('1m', wrapDone(function() {
                expect(nummy(1).metric() +'m').to.equal('1m');
            }));
            it('1km', wrapDone(function() {
                expect(nummy(1000).metric() +'m').to.equal('1km');
            }));
            it('1,000km', wrapDone(function() {
                expect(nummy(1000000).metric() +'m').to.equal('1,000km');
            }));
            it('1,000,000km', wrapDone(function() {
                expect(nummy(1000000000).metric() +'m').to.equal('1,000,000km');
            }));

            it('limited to meters | 1,000,000,000m', wrapDone(function() {
                expect(nummy(1000000000).metric(0, 0) +'m').to.equal('1,000,000,000m');
            }));
            it('limited to meters | 1,000,000m', wrapDone(function() {
                expect(nummy(1000000).metric(0, 0) +'m').to.equal('1,000,000m');
            }));
            it('limited to meters | 1,000m', wrapDone(function() {
                expect(nummy(1000).metric(0, 0) +'m').to.equal('1,000m');
            }));
            it('limited to meters | 1m', wrapDone(function() {
                expect(nummy(1).metric(0, 0) +'m').to.equal('1m');
            }));

            it('limited and 3 decimals', wrapDone(function() {
                expect(nummy(12323.424558).metric(3, 0)).to.equal('12,323.425');
            }));
            it('1 meter is 1,000mm', wrapDone(function() {
                expect(nummy(1).metric(0, -1) +'m').to.equal('1,000mm');
            }));
        });

        describe('#ordinalize', function () {
            it('properly converts numbers to ordinals', wrapDone(function() {
                var OrdinalNumbers = {
                    "-1": "-1st",
                    "-2": "-2nd",
                    "-3": "-3rd",
                    "-4": "-4th",
                    "-5": "-5th",
                    "-6": "-6th",
                    "-7": "-7th",
                    "-8": "-8th",
                    "-9": "-9th",
                    "-10": "-10th",
                    "-11": "-11th",
                    "-12": "-12th",
                    "-13": "-13th",
                    "-14": "-14th",
                    "-20": "-20th",
                    "-21": "-21st",
                    "-22": "-22nd",
                    "-23": "-23rd",
                    "-24": "-24th",
                    "-100": "-100th",
                    "-101": "-101st",
                    "-102": "-102nd",
                    "-103": "-103rd",
                    "-104": "-104th",
                    "-110": "-110th",
                    "-111": "-111th",
                    "-112": "-112th",
                    "-113": "-113th",
                    "-1000": "-1000th",
                    "-1001": "-1001st",
                    "0": "0th",
                    "1": "1st",
                    "2": "2nd",
                    "3": "3rd",
                    "4": "4th",
                    "5": "5th",
                    "6": "6th",
                    "7": "7th",
                    "8": "8th",
                    "9": "9th",
                    "10": "10th",
                    "11": "11th",
                    "12": "12th",
                    "13": "13th",
                    "14": "14th",
                    "20": "20th",
                    "21": "21st",
                    "22": "22nd",
                    "23": "23rd",
                    "24": "24th",
                    "100": "100th",
                    "101": "101st",
                    "102": "102nd",
                    "103": "103rd",
                    "104": "104th",
                    "110": "110th",
                    "111": "111th",
                    "112": "112th",
                    "113": "113th",
                    "1000": "1000th",
                    "1001": "1001st"
                };

                // Test ordinalize
                Object.keys(OrdinalNumbers).forEach(function(str) {
                    expect(nummy().ordinalize(+str)).to.equal(OrdinalNumbers[str], "ordinalizing: " + str + ' failed');
                });

            }));
        });

        describe('#pad', function () {
            it('1 no padding', wrapDone(function() {
                expect(nummy(1).pad(0)).to.equal('1');
            }));
            it('1 padded to 1 place', wrapDone(function() {
                expect(nummy(1).pad(1)).to.equal('1');
            }));
            it('1 padded to 2 places', wrapDone(function() {
                expect(nummy(1).pad(2)).to.equal('01');
            }));
            it('1 padded to 3 places', wrapDone(function() {
                expect(nummy(1).pad(3)).to.equal('001');
            }));
            it('1 padded to 4 places', wrapDone(function() {
                expect(nummy(1).pad(4)).to.equal('0001');
            }));
            it('547 no padding', wrapDone(function() {
                expect(nummy(547).pad(0)).to.equal('547');
            }));
            it('547 padded to 1 place', wrapDone(function() {
                expect(nummy(547).pad(1)).to.equal('547');
            }));
            it('547 padded to 2 places', wrapDone(function() {
                expect(nummy(547).pad(2)).to.equal('547');
            }));
            it('547 padded to 3 places', wrapDone(function() {
                expect(nummy(547).pad(3)).to.equal('547');
            }));
            it('547 padded to 4 places', wrapDone(function() {
                expect(nummy(547).pad(4)).to.equal('0547');
            }));
            it('0 no padding', wrapDone(function() {
                expect(nummy(0).pad(0)).to.equal('0');
            }));
            it('0 padded to 1 place', wrapDone(function() {
                expect(nummy(0).pad(1)).to.equal('0');
            }));
            it('0 padded to 2 places', wrapDone(function() {
                expect(nummy(0).pad(2)).to.equal('00');
            }));
            it('0 padded to 3 places', wrapDone(function() {
                expect(nummy(0).pad(3)).to.equal('000');
            }));
            it('0 padded to 4 places', wrapDone(function() {
                expect(nummy(0).pad(4)).to.equal('0000');
            }));
            it('-1 padded to 1 places', wrapDone(function() {
                expect(nummy(-1).pad(1)).to.equal('-1');
            }));
            it('-1 padded to 2 places', wrapDone(function() {
                expect(nummy(-1).pad(2)).to.equal('-01');
            }));
            it('-1 padded to 3 places', wrapDone(function() {
                expect(nummy(-1).pad(3)).to.equal('-001');
            }));
            it('-1 padded to 4 places', wrapDone(function() {
                expect(nummy(-1).pad(4)).to.equal('-0001');
            }));
            it('does not take decimal places into account', wrapDone(function() {
                expect(nummy(547.528).pad(4)).to.equal('0547.528');
            }));
        });
    });
};