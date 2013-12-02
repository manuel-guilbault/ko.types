exports.addType("moment", {
    required: false,
    isValid: function (value, options) {
        return (!options.required && (value === null || value === undefined)) || moment.isMoment(value);
    }
});