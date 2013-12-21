/*
*   ko.types 0.1.0 (2013-12-21)
*   Created by Manuel Guilbault (https://github.com/manuel-guilbault)
*
*   Source: https://github.com/manuel-guilbault/ko.types
*   MIT License: http://www.opensource.org/licenses/MIT
*/
(function (factory) {
    // Module systems magic dance.

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"), exports);
    } else if (typeof define === "function" && define.amd) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "exports"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, ko.validation = {});
    }
}(function ( ko, exports ) {
    if (typeof (ko) === undefined) { throw "Knockout is required, please ensure it is loaded before loading this plugin"; }
/**
Public API, with the following properties:
    - typeValidators: an object containing the registered type validators.
    - typeConverters: an object containing the registered converters.
    - validation: an object containting the following properties:
    - enable: a boolean value, indicating if integration with knockout.validation is enabled
                (default: true). When enabled, and when the knockout.validation plugin is
                installed, a validator will be installed on the extended observable, which will
                connect the conversion process to the the validation workflow, so that an error
                message can be displayed when conversion fails.
**/
ko.utils.extend(exports, {
    typeValidators: {},
    typeConverters: {},
    validation: {
        enableForConversion: true
    },

    addType: addType,
    getType: getType,
    removeType: removeType,
    clearTypes: clearTypes,
    addConverter: addConverter,
    getConverter: getConverter,
    removeConverter: removeConverter,
    clearConverters: clearConverters
});

ko.types = exports;

function addType(name, validator) {
    if (typeof validator == 'function') {
        validator = { isValid: validator };
    }
    exports.typeValidators[name] = validator;
}

function getType(name) {
    return exports.typeValidators[name];
}

function removeType(name) {
    delete exports.typeValidators[name];
}

function clearTypes() {
    exports.typeValidators = {};
}

function addConverter(fromType, toType, settings) {
    exports.typeConverters[fromType] = exports.typeConverters[fromType] || {};
    exports.typeConverters[fromType][toType] = ko.utils.extend({}, settings);

    var reversedSettings = ko.utils.extend({}, settings);
    var convertTo = reversedSettings.convertTo;
    reversedSettings.convertTo = reversedSettings.convertFrom;
    reversedSettings.convertFrom = convertTo;

    exports.typeConverters[toType] = exports.typeConverters[toType] || {};
    exports.typeConverters[toType][fromType] = reversedSettings;
}

function getConverter(fromType, toType) {
    if (exports.typeConverters[fromType]) {
        return exports.typeConverters[fromType][toType];
    } else if (exports.typeConverters[toType]) {
        return exports.typeConverters[toType][fromType];
    } else {
        return undefined;
    }
}

function removeConverter(fromType, toType) {
    delete exports.typeConverters[fromType][toType];
    delete exports.typeConverters[toType][fromType];
}

function clearConverters() {
    exports.typeConverters = {};
}

function isEmpty(s) {
    return (/^\s*$/).test(s);
}
ko.utils.extend(exports, {
    utils: {
        escapeRegExp: escapeRegExp
    }
});

function escapeRegExp(str) {
    // See http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
exports.addType("boolean", {
    required: false,
    isValid: function (value, options) {
        return (!options.required && (value === null || value === undefined)) || typeof value === "boolean";
    }
});
exports.addType("date", {
    required: false,
    isValid: function (value, options) {
        return (!options.required && (value === null || value === undefined)) || Object.prototype.toString.call(value) === "[object Date]";
    }
});
exports.addType("integer", {
    required: false,
    isValid: function (value, options) {
        return (!options.required && (value === null || value === undefined)) || (typeof value === "number" && value % 1 === 0);
    }
});
exports.addType("moment", {
    required: false,
    isValid: function (value, options) {
        return (!options.required && (value === null || value === undefined)) || moment.isMoment(value);
    }
});
exports.addType("number", {
    required: false,
    isValid: function (value, options) {
        return (!options.required && (value === null || value === undefined)) || typeof value === "number";
    }
});
exports.addType("string", {
    required: false,
    isValid: function (value, options) {
        return (!options.required && (value === null || value === undefined)) || typeof value === "string";
    }
});
exports.addConverter("boolean", "*", {
    convertTo: function (value, options) {
        return value;
    },
    convertFrom: function (value, options) {
        return !!value;
    }
});
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
    exports.addConverter("date", "string", {
        message: "Invalid date value.",
        format: "default",
        convertTo: function (value, options) {
            if (value === undefined || value === null) return "";

            var method = formats[options.format];
            return value[method]();
        },
        convertFrom: function (value, options) {
            if (isEmpty(value)) return undefined;

            value = new Date(value);
            if (isNaN(value.valueOf())) {
                throw new TypeError("Invalid date value.");
            }

            return value;
        }
    });
})();
exports.addConverter("globalized-date", "string", {
    message: "Invalid date value.",
    format: "d",
    culture: "en",
    convertTo: function (value, options) {
        if (value === undefined || value === null) return '';

        return Globalize.format(value, options.format, options.culture);
    },
    convertFrom: function (value, options) {
        if (isEmpty(value)) return undefined;

        value = Globalize.parseDate(value, options.format, options.culture);
        if (isNaN(value.valueOf())) {
            throw new TypeError('Invalid date value.');
        }

        return value;
    }
});
exports.addConverter("globalized-number", "string", {
    message: "Invalid float value.",
    radix: 10,
    format: "n",
    culture: "en",
    convertTo: function (value, options) {
        if (value === undefined || value === null) return "";

        return Globalize.format(value, options.format, options.culture);
    },
    convertFrom: function (value, options) {
        if (isEmpty(value)) return undefined;

        value = Globalize.parseFloat(value, options.radix, options.culture);
        if (isNaN(value)) {
            throw new TypeError("Invalid float value.");
        }

        return value;
    }
});
exports.addConverter("integer", "string", {
    strict: false,
    //TODO implement radix
    message: "Invalid integer value.",
    convertTo: function (value, options) {
        return value !== undefined && value !== null ? value.toString() : "";
    },
    convertFrom: function (value, options) {
        if (isEmpty(value)) return undefined;

        if (options.strict && !/^\s*[0-9]+\s*$/.test(value)) {
            throw new TypeError("Invalid integer value.");
        }

        value = parseInt(value, 10);
        if (isNaN(value)) {
            throw new TypeError("Invalid integer value.");
        }

        return value;
    }
});
exports.addConverter("moment", "date", {
    convertTo: function (value, options) {
        if (value === undefined || value === null) return value;

        return value.toDate();
    },
    convertFrom: function (value, options) {
        if (value === undefined || value === null) return value;

        return moment(value);
    }
});
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
exports.addConverter("number", "string", {
    strict: false,
    message: "Invalid number value.",
    decimals: 0,
    convertTo: function (value, options) {
        if (value === undefined || value === null) return "";

        return options.decimals > 0 ? value.toFixed(options.decimals) : value.toString();
    },
    convertFrom: function (value, options) {
        if (isEmpty(value)) return undefined;

        if (options.strict && !/^\s*[0-9]+(\.[0-9]+)?\s*$/.test(value)) {
            throw new TypeError("Invalid number value.");
        }

        value = parseFloat(value);
        if (isNaN(value)) {
            throw new TypeError("Invalid number value.");
        }

        return value;
    }
});
exports.addConverter("string", "*", {
    convertTo: function (value, options) {
        return value;
    },
    convertFrom: function (value, options) {
        if (value === null || value === undefined) {
            return "";
        } else {
            return value.toString();
        }
    }
});
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
}));