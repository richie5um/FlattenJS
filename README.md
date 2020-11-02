# FlattenJS

A small simple library to easily flatten / unflatten JSON objects. Uses square brackets in path to preserve arrays.

> The path format works the same as [RSPath](https://www.npmjs.com/package/rspath).

## Installation

    npm install flattenjs --save

## Updates

* 2.1.0: Added opt-in 'preserveEmpty'. Updated lodash dependency. @adil

## Usage

    import { flatten, inflate } from 'flattenjs'

    // Simple

    var obj = {
        a: true
    };

    var flattened = flatten(obj);
    console.log(flattened);
    // { a: true }

    var unflattened = inflate(flattened);
    console.log(unflattened);
    // { a: true }

    // Arrays

    obj = {
        a: true,
        b: {
            ba: [],
            bb: [0, 1, 2, 3, 4]
        }
    };

    flattened = flatten(obj);
    console.log(flattened);
    // {
    //     'a': true,
    //     'b.bb[0]': 0,
    //     'b.bb[1]': 1,
    //     'b.bb[2]': 2,
    //     'b.bb[3]': 3,
    //     'b.bb[4]': 4
    // }

    unflattened = inflate(flattened);
    console.log(unflattened);
    // { a: true, b: { bb: [ 0, 1, 2, 3, 4 ] } }

    // Arrays and Objects

    obj = {
        a: true,
        b: {
            ba: [{
                baa: [0, 1, 2, 3, 4]
            }, {
                bab: [0, 1, 2, 3, 4]
            }]
        }
    };

    flattened = flatten(obj);
    console.log(flattened);
    // {
    //     'a': true,
    //     'b.ba[0].baa[0]': 0,
    //     'b.ba[0].baa[1]': 1,
    //     'b.ba[0].baa[2]': 2,
    //     'b.ba[0].baa[3]': 3,
    //     'b.ba[0].baa[4]': 4,
    //     'b.ba[1].bab[0]': 0,
    //     'b.ba[1].bab[1]': 1,
    //     'b.ba[1].bab[2]': 2,
    //     'b.ba[1].bab[3]': 3,
    //     'b.ba[1].bab[4]': 4
    // }

    unflattened = inflate(flattened);
    console.log(unflattened);

## Preserve Empty Objects/Arrays

This is now available as an opt-in option in flattenjs@2.1.0. Set the second parameter to 'flatten(obj, true)' to enable the preserveEmpty capability.

    var Flatten = require('./flatten');

    var test = {
        a: { 
            b: 1, 
            c: [], 
            d: {},
            f: [{ g: {} }]
        },
        e: {}
    };

    var flattened = Flatten.flatten(test, true);
    console.log(JSON.stringify(flattened, undefined, 2));

    var inflated = Flatten.inflate(flattened);
    console.log(JSON.stringify(inflated, undefined, 2));