exports.addType("date", {
    required: false,
    isValid: function (value, options) {
        return (!options.required && (value === null || value === undefined)) || Object.prototype.toString.call(value) === "[object Date]";
    }
});