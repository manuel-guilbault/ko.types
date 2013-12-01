describe("namespace tests", function () {
    it("can register a type", function () {
        var type = "test";
        var validator = function(value) {};

        ko.types.addType(type, validator);
        
        expect(ko.types.getType(type)).toBe(validator);
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