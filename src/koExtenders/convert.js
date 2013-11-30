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
        if (!target.dataType) throw new Error("fromType is missing");

        options = { fromType: target.dataType, toType: options };
    } else if (!options.fromType && target.dataType) {
        options.fromType = target.dataType;
    }

    if (options.fromType && options.toType) {
        baseOptions = exports.getConverter(options.fromType, options.toType);
        delete options.fromType;
        delete options.toType;
    } else {
        baseOptions = {};
    }
    options = ko.utils.extend(baseOptions, options);

    var converted = ko.observable(options.convertFrom(target(), options));
    converted.subscribe(function (value) {
        var isValid = true;
        
        try {
            value = options.convertTo(value, options);
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
                        options.convertTo(value, options);
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