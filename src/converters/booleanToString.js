(function() {
    function compileValuesExpr(values) {
        var escapedValues = [];
        for (var i = 0; i < values.length; ++i) {
            escapedValues.push(exports.utils.escapeRegExp(values[i]));
        }
        return escapedValues.join("|");
    }

    function compileExpr(trueValues, falseValues) {
        return new RegExp("^\\s*((" + compileValuesExpr(trueValues) + ")|(" + compileValuesExpr(falseValues) + "))\\s*$", "i");
    }

    exports.addConverter("boolean", "string", {
        trueValues: ["true"],
        falseValues: ["false"],
        message: "Invalid boolean value.",
        convertTo: function (value, options) {
            if (value === undefined || value === null) {
                return "";
            } else {
                return value ? options.trueValues[0] : options.falseValues[0];
            }
        },
        convertFrom: function (value, options) {
            if (isEmpty(value)) return undefined;

            var expression = compileExpr(options.trueValues, options.falseValues);
            var matches = expression.exec(value);
            if (matches === null) {
                throw new TypeError("Invalid boolean value.");
            }

            return matches[2] !== undefined;
        }
    });
})();