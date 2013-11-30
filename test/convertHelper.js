function convertTo(fromType, toType, value, options) {
    var settings = ko.utils.extend({}, ko.types.getConverter(fromType, toType));
    options = ko.utils.extend(settings, options || {});
    return options.convertTo(value, options);
}

function convertFrom(fromType, toType, value, options) {
    var settings = ko.utils.extend({}, ko.types.getConverter(fromType, toType));
    options = ko.utils.extend(settings, options || {});
    return options.convertFrom(value, options);
}