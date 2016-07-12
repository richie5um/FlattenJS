let _ = require('lodash');

export function undo(params) {
    return _.reduce(params, function (result, value, key) { return _.set(result, key, value) }, {});
}

export function convert(obj) {
    let result = {};
    _.each(obj, (value, key) => {
        if (_.isObject(value)) {
            let flatObj = convert(value);
            _.each(flatObj, (o, k) => {
                let flatKey = _.isArray(value) ? `${key}[${k}]` : `${key}.${k}`;
                result[flatKey] = o;
            })
        } else {
            result[key] = value;
        }
    });
    return result;
}
