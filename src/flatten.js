"use strict";
var _ = require('lodash');
function undo(params) {
    return _.reduce(params, function (result, value, key) { return _.set(result, key, value); }, {});
}
exports.undo = undo;
function convert(obj, parentKey) {
    parentKey = parentKey || '';
    return _.transform(obj, function (result, value, key) {
        if (_.isObject(obj)) {
            if (_.isArray(value)) {
                key = parentKey + "[" + key + "]";
            }
            else {
                key = "" + parentKey + (parentKey ? '.' : '') + key;
            }
            _.assign(result, convert(value, key));
        }
        else {
            key = value + " " + parentKey + (parentKey ? '.' : '') + key;
            result[key] = value;
        }
        return result;
    });
}
exports.convert = convert;
;
//# sourceMappingURL=flatten.js.map