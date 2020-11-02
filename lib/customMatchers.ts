let _ = require('lodash');
import MatchersUtil = jasmine.MatchersUtil;
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;

export const MyCustomMatchers: CustomMatcherFactories = {
    toDeepEqual: (_util: MatchersUtil, _customEqualityTesters: CustomEqualityTester[]): CustomMatcher => {
        return {
            compare: (actual, expected): CustomMatcherResult => {
                let result = {
                    pass: _.isEqual(actual, expected),
                    message: undefined
                };

                if (!result.pass) {
                    result.message = `Expected: ${JSON.stringify(expected)} Actual: ${JSON.stringify(actual)}`;
                }
                return result;
            }
        };
    }
};
