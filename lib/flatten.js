"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
function undo(params) {
    return inflate(params);
}
exports.undo = undo;
function inflate(params) {
    return _.reduce(params, function (result, value, key) { return _.set(result, key, value); }, {});
}
exports.inflate = inflate;
function convert(obj, preserveEmpty) {
    if (preserveEmpty === void 0) { preserveEmpty = false; }
    return flatten(obj, preserveEmpty);
}
exports.convert = convert;
function flatten(obj, preserveEmpty) {
    if (preserveEmpty === void 0) { preserveEmpty = false; }
    return _.transform(obj, function (result, value, key) {
        if (_.isObject(value)) {
            var flatMap = _.mapKeys(flatten(value, preserveEmpty), function (_mvalue, mkey) {
                if (_.isArray(value)) {
                    var index = mkey.indexOf('.');
                    if (-1 !== index) {
                        return key + "[" + mkey.slice(0, index) + "]" + mkey.slice(index);
                    }
                    return key + "[" + mkey + "]";
                }
                return key + "." + mkey;
            });
            _.assign(result, flatMap);
            if (preserveEmpty && _.keys(flatMap).length === 0) {
                result[key] = value;
            }
        }
        else {
            result[key] = value;
        }
        return result;
    }, {});
}
exports.flatten = flatten;
//# sourceMappingURL=flatten.js.map