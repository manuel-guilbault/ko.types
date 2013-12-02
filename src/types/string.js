exports.addType("string", {
    required: false,
    isValid: function (value, options) {
        return (!options.required && (value === null || value === undefined)) || typeof value === "string";
    }
});