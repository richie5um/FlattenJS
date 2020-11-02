"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flatten_1 = require("./flatten");
var customMatchers_1 = require("./customMatchers");
describe('flatten', function () {
    beforeAll(function () {
        jasmine.addMatchers(customMatchers_1.MyCustomMatchers);
    });
    it('simple', function () {
        var obj = {};
        var flattened = flatten_1.flatten(obj);
        expect(flattened).toDeepEqual({});
        var inflated = flatten_1.inflate(flattened);
        expect(inflated).toDeepEqual(obj);
    });
    it('value', function () {
        var obj = { a: 1 };
        var flattened = flatten_1.flatten(obj);
        expect(flattened).toDeepEqual(obj);
        var inflated = flatten_1.inflate(flattened);
        expect(inflated).toDeepEqual(obj);
    });
    it('array', function () {
        var obj = { a: [1, 2] };
        var flattened = flatten_1.flatten(obj);
        expect(flattened).toDeepEqual({ 'a[0]': 1, 'a[1]': 2 });
        var inflated = flatten_1.inflate(flattened);
        expect(inflated).toDeepEqual(obj);
    });
    it('nested array', function () {
        var obj = {
            a: {
                b: [1]
            }
        };
        var flattened = flatten_1.flatten(obj);
        expect(flattened).toDeepEqual({ 'a.b[0]': 1 });
        var inflated = flatten_1.inflate(flattened);
        expect(inflated).toDeepEqual(obj);
    });
    it('nested array object', function () {
        var obj = {
            a: {
                b: [{ c: 1 }]
            }
        };
        var flattened = flatten_1.flatten(obj);
        expect(flattened).toDeepEqual({ 'a.b[0].c': 1 });
        var inflated = flatten_1.inflate(flattened);
        expect(inflated).toDeepEqual(obj);
    });
    it('empty objects', function () {
        var obj = {
            a: {
                b: [{ c: {} }]
            },
            d: {}
        };
        var flattened = flatten_1.flatten(obj, true);
        expect(flattened).toDeepEqual({ 'a.b[0].c': {}, 'd': {} });
        var inflated = flatten_1.inflate(flattened);
        expect(inflated).toDeepEqual(obj);
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
        var flattened = flatten_1.flatten(obj);
        expect(flattened).toDeepEqual({
            'a.b[0]': 1,
            'a.b[1].c': 'hello',
            'a.d': 'world',
            'e': '!'
        });
        var inflated = flatten_1.inflate(flattened);
        expect(inflated).toDeepEqual(obj);
    });
});
//# sourceMappingURL=flatten.spec.js.map