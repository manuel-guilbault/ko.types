exports.addConverter("moment", "string", {
    strict: false,
    language: "en",
    format: "L",
    message: "Invalid date/time value.",
    convertTo: function (value, options) {
        if (value === undefined || value === null) return "";

        return moment(value).lang(options.language).format(options.format);
    },
    convertFrom: function (value, options) {
        if (isEmpty(value)) return undefined;

        var result = moment(value, options.format, options.language, options.strict);
        if (!result.isValid()) {
            throw new TypeError("Invalid moment value.");
        }
        return result;
    }
});