(function () {
    var formats = {
        "date": "toDateString",
        "iso": "toISOString",
        "json": "toJSON",
        "localeDate": "toLocaleDateString",
        "localeTime": "toLocaleTimeString",
        "locale": "toLocaleString",
        "time": "toTimeString",
        "utc": "toUTCString",
        "default": "toString"
    };
    exports.addConverter("string", "date", {
        message: "Invalid date value.",
        format: "default",
        convertTo: function (value, options) {
            if (isEmpty(value)) return undefined;

            value = new Date(value);
            if (isNaN(value.valueOf())) {
                throw new TypeError("Invalid date value.");
            }

            return value;
        },
        convertFrom: function (value, options) {
            if (value === undefined || value === null) return "";

            var method = formats[options.format];
            return value[method]();
        }
    });
})();