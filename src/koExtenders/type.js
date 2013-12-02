/**
    observable.extend({ type: string });

Restrict the type of data that can be passed to the observable. The observable's setter will throw an
error if the wrong data type is passed.
//TODO allow to integrate with knockout.validation and set to invalid instead of throwing an error ??
**/
ko.extenders.type = function (target, settings) {
    var options, dataType;
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

    var result = ko.computed({
        read: function () {
            return target();
        },
        write: function (value) {
            if (!options.isValid(value)) {
                if (dataType) {
                    throw new TypeError("Invalid type : expected " + dataType + ".");
                } else {
                    throw new TypeError("Invalid type.");
                }
            }

            target(value);
        }
    });
    result.dataType = dataType;
    return result;
};