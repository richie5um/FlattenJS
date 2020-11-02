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
//# sourceMappingURL=index.spec.js.map