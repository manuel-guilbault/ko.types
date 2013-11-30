exports.addConverter("string", "globalized-date", {
    message: "Invalid date value.",
    format: "d",
    convertTo: function (value, options) {
        if (isEmpty(value)) return undefined;

        value = Globalize.parseDate(value, options.format, options.language);
        if (isNaN(value.valueOf())) {
            throw new TypeError('Invalid date value.');
        }

        return value;
    },
    convertFrom: function (value, options) {
        if (value === undefined || value === null) return '';

        return Globalize.format(value, options.format, options.language);
    }
});