exports.addType("string", function (value) {
    return value === null || value === undefined || typeof value === "string";
});