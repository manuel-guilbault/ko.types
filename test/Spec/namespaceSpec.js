describe("namespace tests", function () {
    it("can register a type", function () {
        var type = "test";
        var settings = { isValid: function (value) { } };

        ko.types.addType(type, settings);
        
        expect(ko.types.getType(type)).toBe(settings);
    });
    it("can register a type (function only)", function () {
        var type = "test";
        var validator = function (value) { };

        ko.types.addType(type, validator);

        expect(ko.types.getType(type)).toEqual({ isValid: validator });
    });
    it("can register and retrieve a converter", function () {
        var fromType = "testFrom";
        var toType = "testTo";
        var settings = {
            convertTo: 1,
            convertFrom: 2
        };

        ko.types.addConverter(fromType, toType, settings);

        expect(ko.types.getConverter(fromType, toType)).toEqual(settings);
    });
    it("can register and retrieve a converter with reversed type", function () {
        var fromType = "testFrom";
        var toType = "testTo";
        var settings = {
            convertTo: 1,
            convertFrom: 2
        };

        ko.types.addConverter(fromType, toType, settings);

        var reversedSettings = ko.utils.extend({}, settings);
        var convertTo = reversedSettings.convertTo;
        reversedSettings.convertTo = reversedSettings.convertFrom;
        reversedSettings.convertFrom = convertTo;
        expect(ko.types.getConverter(toType, fromType)).toEqual(reversedSettings);
    });
});