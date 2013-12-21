exports.addConverter("moment", "date", {
    convertTo: function (value, options) {
        if (value === undefined || value === null) return value;

        return value.toDate();
    },
    convertFrom: function (value, options) {
        if (value === undefined || value === null) return value;

        return moment(value);
    }
});