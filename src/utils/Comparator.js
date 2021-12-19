const equal = require('fast-deep-equal/es6/react');

module.exports.objectsAreEquals = (object1, object2) => {
    return equal(object1, object2);
};

module.exports.arraysAreEquals = (array1, array2) => {
    return equal(array1, array2);
}