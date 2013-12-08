exports.addConverter("string", "*", {
    convertTo: function (value, options) {
        return value;
    },
    convertFrom: function (value, options) {
        if (value === null || value === undefined) {
            return "";
        } else {
            return value.toString();
        }
    }
});