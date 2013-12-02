exports.addType("integer", {
    required: false,
    isValid: function (value, options) {
        return (!options.required && (value === null || value === undefined)) || (typeof value === "number" && value % 1 === 0);
    }
});