exports.addType("boolean", {
    required: false,
    isValid: function (value, options) {
        return (!options.required && (value === null || value === undefined)) || typeof value === "boolean";
    }
});