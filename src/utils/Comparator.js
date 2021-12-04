function objectsAreEquals(object1, object2) {
    return JSON.stringify(object1) === JSON.stringify(object2);
}

module.exports.objectsAreEquals = objectsAreEquals;
module.exports.arraysAreEquals = (array1, array2) => {
    if((typeof array1) !== "object" || (typeof array2) !== "object"){
        return array1 === array2;
    }

    if ((typeof array1) === "object" && (typeof array2) === "object" && array1.length !== array2.length) {
        return false;
    }

    return array1.every((currenValue, index) => objectsAreEquals(array1[index], array2[index]));
}