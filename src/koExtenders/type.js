/**
    observable.extend({ type: string });

Restrict the type of data that can be passed to the observable. The observable's setter will throw an
error if the wrong data type is passed.
//TODO allow to integrate with knockout.validation and set to invalid instead of throwing an error ??
**/
ko.extenders.type = function (source, settings) {
    var options, dataType;

    // Normalize settings.
    if (typeof settings == "string") {
        options = exports.getType(settings);
        dataType = settings;
    } else if (typeof settings == "function") {
        options = {
            isValid: settings
        };
    } else {
        options = settings;
    }

    // Validate source's initialize value.
    validate(source());

    // Wrap in type-safe computed observable.
    var typeSafe = ko.computed({
        read: function () {
            return source();
        },
        write: function (value) {
            validate(value);
            source(value);
        }
    });
    typeSafe.dataType = dataType;
    return typeSafe;

    function validate(value) {
        if (!options.isValid(value, options)) {
            if (dataType) {
                throw new TypeError("Invalid type : expected " + dataType + ".");
            } else {
                throw new TypeError("Invalid type.");
            }
        }
    }
};