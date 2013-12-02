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