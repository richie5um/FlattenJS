let _ = require('lodash');

// Maintain previous exported func names
export function undo(params) {
    return inflate(params);
}

export function inflate(params) {
    return _.reduce(params, function (result, value, key) { return _.set(result, key, value) }, {});
}

// Maintain previous exported func names
export function convert(obj, preserveEmpty = false) {
    return flatten(obj, preserveEmpty);
}

export function flatten(obj, preserveEmpty = false) {
    return _.transform(obj, function (result, value, key) {
        if (_.isObject(value)) {
            let flatMap = _.mapKeys(flatten(value, preserveEmpty), function (_mvalue, mkey) {
                if (_.isArray(value)) {
                    let index = mkey.indexOf('.');
                    if (-1 !== index) {
                        return `${key}[${mkey.slice(0, index)}]${mkey.slice(index)}`;
                    }
                    return `${key}[${mkey}]`;
                }
                return `${key}.${mkey}`;
            });

            _.assign(result, flatMap);

            // Preverve Empty arrays and objects
            if (preserveEmpty && _.keys(flatMap).length === 0) {
                result[key] = value;              
            }
        } else {
            result[key] = value;
        }

        return result;
    }, {});
}
