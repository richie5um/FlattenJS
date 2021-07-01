import { flatten, inflate } from './flatten';
import { MyCustomMatchers } from './customMatchers';

describe('flatten', function () {

    beforeAll(function () {
        jasmine.addMatchers(MyCustomMatchers);
    });

    it('simple', function () {
        var obj = {};
        var flattened = flatten(obj);
        expect(flattened).toDeepEqual({});

        var inflated = inflate(flattened);
        expect(inflated).toDeepEqual(obj);
    });

    it('value', function () {
        var obj = { a: 1 };
        var flattened = flatten(obj);
        expect(flattened).toDeepEqual(obj);

        var inflated = inflate(flattened);
        expect(inflated).toDeepEqual(obj);
    });

    it('array', function () {
        var obj = { a: [1, 2] };
        var flattened = flatten(obj);
        expect(flattened).toDeepEqual({ 'a[0]': 1, 'a[1]': 2 });

        var inflated = inflate(flattened);
        expect(inflated).toDeepEqual(obj);
    });

    it('nested array', function () {
        var obj = {
            a: {
                b: [1]
            }
        };

        var flattened = flatten(obj);
        expect(flattened).toDeepEqual({ 'a.b[0]': 1 });

        var inflated = inflate(flattened);
        expect(inflated).toDeepEqual(obj);
    });

    it('nested array object', function () {
        var obj = {
            a: {
                b: [{ c: 1 }]
            }
        };

        var flattened = flatten(obj);
        expect(flattened).toDeepEqual({ 'a.b[0].c': 1 });

        var inflated = inflate(flattened);
        expect(inflated).toDeepEqual(obj);
    });

    it('empty objects', function () {
        var obj = {
            a: {
                b: [{ c: {} }]
            },
            d: {}
        };

        var flattened = flatten(obj, true);
        expect(flattened).toDeepEqual({ 'a.b[0].c': {}, 'd': {} });

        var inflated = inflate(flattened);
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

        var flattened = flatten(obj);
        expect(flattened).toDeepEqual({
            'a.b[0]': 1,
            'a.b[1].c': 'hello',
            'a.d': 'world',
            'e': '!'
        });

        var inflated = inflate(flattened);
        expect(inflated).toDeepEqual(obj);
    });

    it('undefined array items', function () {
        var obj = {
            a: {
                b: [, 1, 2, undefined]
            }
        };

        var flattened = flatten(obj, false);
        expect(flattened).toDeepEqual({
            'a.b[0]': undefined,
            'a.b[1]': 1,
            'a.b[2]': 2,
            'a.b[3]': undefined
        });

        var inflated = inflate(flattened);
        expect(inflated).toDeepEqual(obj);

        console.log(obj.a.b);
        console.log(inflated.a.b);
    });
});