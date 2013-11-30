exports.addConverter("string", "boolean", {
    strict: false,
    message: "Invalid boolean value.",
    convertTo: function (value, options) {
        if (options.strict) {
            if (isEmpty(value)) return undefined;

            var matches = /^\s*(true|false)\s*$/i.exec(value);
            if (matches === null) {
                throw new TypeError("Invalid boolean value.");
            }
            return matches[1].toLowerCase() === "true";
        } else {
            return !!value;
        }
    },
    convertFrom: function (value, options) {
        return value !== undefined && value !== null ? value.toString() : "";
    }
});