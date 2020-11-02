"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
exports.MyCustomMatchers = {
    toDeepEqual: function (_util, _customEqualityTesters) {
        return {
            compare: function (actual, expected) {
                var result = {
                    pass: _.isEqual(actual, expected),
                    message: undefined
                };
                if (!result.pass) {
                    result.message = "Expected: " + JSON.stringify(expected) + " Actual: " + JSON.stringify(actual);
                }
                return result;
            }
        };
    }
};
//# sourceMappingURL=customMatchers.js.map