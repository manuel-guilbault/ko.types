exports.addConverter("string", "integer", {
    strict: false,
    //TODO implement radix
    message: "Invalid integer value.",
    convertTo: function (value, options) {
        if (isEmpty(value)) return undefined;

        if (options.strict && !/^\s*[0-9]+\s*$/.test(value)) {
            throw new TypeError("Invalid integer value.");
        }

        value = parseInt(value, 10);
        if (isNaN(value)) {
            throw new TypeError("Invalid integer value.");
        }

        return value;
    },
    convertFrom: function (value, options) {
        return value !== undefined && value !== null ? value.toString() : "";
    }
});