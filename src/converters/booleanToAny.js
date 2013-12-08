exports.addConverter("boolean", "*", {
    convertTo: function (value, options) {
        return value;
    },
    convertFrom: function (value, options) {
        return !!value;
    }
});