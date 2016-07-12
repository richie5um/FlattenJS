"use strict";
var _ = require('lodash');
function undo(params) {
    return _.reduce(params, function (result, value, key) { return _.set(result, key, value); }, {});
}
exports.undo = undo;
function convert(obj) {
    var result = {};
    _.each(obj, function (value, key) {
        if (_.isObject(value)) {
            var flatObj = convert(value);
            _.each(flatObj, function (o, k) {
                var flatKey = _.isArray(value) ? key + "[" + k + "]" : key + "." + k;
                result[flatKey] = o;
            });
        }
        else {
            result[key] = value;
        }
    });
    return result;
}
exports.convert = convert;
//# sourceMappingURL=flatten.js.map