exports.addType("boolean", function (value) {
    return value === null || value === undefined || typeof value === "boolean";
});