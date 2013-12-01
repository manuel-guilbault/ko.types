exports.addConverter("boolean", "string", {
    strict: false,
    message: "Invalid boolean value.",
    convertTo: function (value, options) {
        return value !== undefined && value !== null ? value.toString() : "";
    },
    convertFrom: function (value, options) {
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
    }
});