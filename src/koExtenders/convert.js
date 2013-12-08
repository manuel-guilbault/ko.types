/**
    observable.extend({ convert: string });

Expected to be chained with extend({ type }), where type is used as fromType, and the value passed to
convert is the toType.

    observable.extend({ convert: { fromType: string, toType: string, ... } });

Pass a configuration object with at least the fromType and toType, possibly with converter options.

    observable.extend({ convert: { convertTo: function, convertFrom: function } });

Pass two conversion functions: convertTo to convert from string to the underlying type,
and convertFrom to convert from the underlying type to string. Both methods are passed two parameters:
    - value: the value to convert.
    - options: the options of the converter (the configuration object passed to the extend method.

Additionally, those options can be passed:
    - message: the error message to display when an invalid value is written. Used by knockout.validation plugin
            (when enabled).
    - onValidate: function called when a value is written, with the following parameters:
    - isValid: a boolean, indicating if the written value is valid or not.
    - event: if isValid is true, undefined; otherwise, an object, having the following properties:
        - value: the invalid value,
        - error: the catched error thrown by the convertTo function.
**/
ko.extenders.convert = function (target, settings) {
    var options = settings;
    if (typeof options == "string") {
        options = { toType: options };
    } else if (typeof options != "object") {
        throw new TypeError("settings must be either a string or an object");
    }
    
    if (!options.convertTo || !options.convertFrom) {
        options.fromType = options.fromType || target.dataType || "*";
        options.toType = options.toType || "*";

        if (options.fromType == "*" && options.toType == "*") {
            throw new Error("fromType and toType cannot be both '*'");
        }

        baseOptions = exports.getConverter(options.fromType, options.toType);
        if (baseOptions === undefined) {
            throw new Error("converter not found (fromType: " + options.fromType + ", toType: " + options.toType + ")");
        }

        baseOptions = ko.utils.extend({}, baseOptions);
        options = ko.utils.extend(baseOptions, options);
    }

    var converted = ko.observable(options.convertTo(target(), options));
    target.subscribe(function (value) {
        converted(options.convertTo(target(), options));
    });
    converted.subscribe(function (value) {
        var isValid = true;
        
        try {
            value = options.convertFrom(value, options);
            event = undefined;
        } catch (error) {
            isValid = false;
            event = {
                value: value,
                error: error
            };
        }

        if (options.onValidate) {
            options.onValidate(isValid, event);
        }

        if (isValid) {
            target(value);
        }
    });

    if (ko.validation && exports.validation.enableForConversion) {
        converted = converted.extend({
            validation: {
                validator: function (value) {
                    try {
                        options.convertFrom(value, options);
                        return true;
                    } catch (e) {
                        return false;
                    }
                },
                message: options.message || "Invalid value."
            }
        });
    }

    return converted;
};