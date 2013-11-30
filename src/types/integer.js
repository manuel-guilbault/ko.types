exports.addType("integer", function (value) {
    return value === null || value === undefined || (typeof value === "number" && value % 1 === 0);
});