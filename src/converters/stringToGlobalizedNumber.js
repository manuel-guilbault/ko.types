﻿exports.addConverter("string", "globalized-number", {
    message: "Invalid float value.",
    radix: 10,
    format: "n",
    language: "en",
    convertTo: function (value, options) {
        if (isEmpty(value)) return undefined;

        value = Globalize.parseFloat(value, options.radix, options.language);
        if (isNaN(value)) {
            throw new TypeError("Invalid float value.");
        }

        return value;
    },
    convertFrom: function (value, options) {
        if (value === undefined || value === null) return "";

        return Globalize.format(value, options.format, options.language);
    }
});