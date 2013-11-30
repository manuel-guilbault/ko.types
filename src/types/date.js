exports.addType("date", function (value) {
    return value === null || value === undefined || Object.prototype.toString.call(value) === "[object Date]";
});