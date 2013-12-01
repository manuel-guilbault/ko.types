exports.addConverter("number", "string", {
    strict: false,
    message: "Invalid number value.",
    decimals: 0,
    convertTo: function (value, options) {
        if (value === undefined || value === null) return "";

        return options.decimals > 0 ? value.toFixed(options.decimals) : value.toString();
    },
    convertFrom: function (value, options) {
        if (isEmpty(value)) return undefined;

        if (options.strict && !/^\s*[0-9]+(\.[0-9]+)?\s*$/.test(value)) {
            throw new TypeError("Invalid number value.");
        }

        value = parseFloat(value);
        if (isNaN(value)) {
            throw new TypeError("Invalid number value.");
        }

        return value;
    }
});