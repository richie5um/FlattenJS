"use strict";
var Flatten = require('./flatten');
var CustomMatchers = require('./customMatchers');
describe('flatten', function () {
    beforeAll(function () {
        jasmine.addMatchers(CustomMatchers.matchers);
    });
    it('simple', function () {
        var obj = {};
        var result = Flatten.convert(obj);
        expect(result).toDeepEqual({});
    });
    it('value', function () {
        var obj = { a: 1 };
        var result = Flatten.convert(obj);
        expect(result).toDeepEqual(obj);
    });
    it('array', function () {
        var obj = { a: [1, 2] };
        var result = Flatten.convert(obj);
        expect(result).toDeepEqual({ 'a[0]': 1, 'a[1]': 2 });
    });
    it('nested array', function () {
        var obj = {
            a: {
                b: [1]
            }
        };
        var result = Flatten.convert(obj);
        expect(result).toDeepEqual({ 'a.b[0]': 1 });
    });
    it('nested array', function () {
        var obj = {
            a: {
                b: [1, {
                        c: 'hello'
                    }],
                d: 'world'
            },
            e: '!'
        };
        var result = Flatten.convert(obj);
        expect(result).toDeepEqual({
            'a.b[0]': 1,
            'a.b[1].c': 'hello',
            'a.d': 'world',
            'e': '!'
        });
    });
});
//# sourceMappingURL=flatten.spec.js.map