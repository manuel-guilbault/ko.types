exports.addType("moment", function (value) {
    return value === null || value === undefined || moment.isMoment(value);
});