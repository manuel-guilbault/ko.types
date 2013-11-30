exports.addType("number", function (value) {
    return value === null || value === undefined || typeof value === "number";
});