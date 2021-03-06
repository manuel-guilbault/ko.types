﻿describe("convert extender tests", function () {
    describe("named converters", function () {
        afterEach(function () {
            ko.types.removeConverter("string", "test");
        });

        it("can read value", function () {
            ko.types.addConverter("test", "string", {
                convertTo: jasmine.createSpy("convertTo").andReturn("12"),
                convertFrom: jasmine.createSpy("convertFrom").andReturn(12)
            });

            var source = ko.observable(12);
            var converted = source.extend({ convert: { fromType: "test", toType: "string" } });

            expect(converted()).toBe("12");
        });
        it("can write valid value", function () {
            var settings = {
                convertTo: jasmine.createSpy("convertTo").andReturn("9"),
                convertFrom: jasmine.createSpy("convertFrom").andReturn(12),
                onValidate: jasmine.createSpy("onValidate")
            };
            ko.types.addConverter("test", "string", settings);

            var source = ko.observable(9);
            var converted = source.extend({ convert: { fromType: "test", toType: "string" } });

            converted("12");

            expect(source()).toBe(12);
            expect(settings.convertTo).toHaveBeenCalled();
            expect(settings.onValidate).toHaveBeenCalledWith(true, undefined);
        });
        it("cannot write invalid value", function () {
            var settings = {
                convertTo: jasmine.createSpy("convertTo").andReturn(9),
                convertFrom: jasmine.createSpy("convertFrom").andCallFake(function () { throw new TypeError("Invalid value."); }),
                onValidate: jasmine.createSpy("onValidate")
            };
            ko.types.addConverter("test", "string", settings);

            var source = ko.observable(9);
            var converted = source.extend({ convert: { fromType: "test", toType: "string" } });

            converted("12");

            expect(source()).toBe(9);
            expect(settings.convertTo).toHaveBeenCalled();
            expect(settings.onValidate).toHaveBeenCalledWith(false, jasmine.any(Object));
        });
    });
    describe("anonymous converters", function () {
        it("can read value", function () {
            var settings = {
                convertTo: jasmine.createSpy("convertTo").andReturn("12"),
                convertFrom: jasmine.createSpy("convertFrom").andReturn(12)
            };

            var source = ko.observable(12);
            var converted = source.extend({ convert: settings });

            expect(converted()).toBe("12");
        });
        it("can write valid value", function () {
            var settings = {
                convertTo: jasmine.createSpy("convertTo").andReturn("9"),
                convertFrom: jasmine.createSpy("convertFrom").andReturn(12),
                onValidate: jasmine.createSpy("onValidate")
            };

            var source = ko.observable(9);
            var converted = source.extend({ convert: settings });

            converted("12");

            expect(source()).toBe(12);
            expect(settings.convertTo).toHaveBeenCalled();
            expect(settings.onValidate).toHaveBeenCalledWith(true, undefined);
        });
        it("cannot write invalid value", function () {
            var settings = {
                convertTo: jasmine.createSpy("convertTo").andReturn(9),
                convertFrom: jasmine.createSpy("convertFrom").andCallFake(function () { throw new TypeError("Invalid value."); }),
                onValidate: jasmine.createSpy("onValidate")
            };

            var source = ko.observable(9);
            var converted = source.extend({ convert: settings });

            converted("12");

            expect(source()).toBe(9);
            expect(settings.convertTo).toHaveBeenCalled();
            expect(settings.onValidate).toHaveBeenCalledWith(false, jasmine.any(Object));
        });
    });
    //TODO test that options are passed to convertTo and convertFrom
    describe("ko.validation integration", function () {
        afterEach(function () {
            ko.types.validation.enableForConversion = true;
        });

        it("is valid when valid value is written", function () {
            var settings = {
                convertTo: jasmine.createSpy("convertTo").andReturn("9"),
                convertFrom: jasmine.createSpy("convertFrom").andReturn(12)
            };

            var source = ko.observable(9);
            var converted = source.extend({ convert: settings });

            converted("12");

            expect(source()).toBe(12);
            expect(settings.convertTo).toHaveBeenCalled();
            expect(converted.isValid()).toBe(true);
        });
        it("is invalid when invalid value is written", function () {
            var settings = {
                convertTo: jasmine.createSpy("convertTo").andReturn(9),
                convertFrom: jasmine.createSpy("convertFrom").andCallFake(function () { throw new TypeError("Invalid value."); })
            };

            var source = ko.observable(9);
            var converted = source.extend({ convert: settings });

            converted("12");

            expect(source()).toBe(9);
            expect(settings.convertTo).toHaveBeenCalled();
            expect(converted.isValid()).toBe(false);
        });
        it("has error message when invalid value is written", function () {
            var settings = {
                convertTo: jasmine.createSpy("convertTo").andReturn(9),
                convertFrom: jasmine.createSpy("convertFrom").andCallFake(function () { throw new TypeError("Invalid value."); }),
                message: "Test message"
            };

            var source = ko.observable(9);
            var converted = source.extend({ convert: settings });

            converted("12");

            expect(source()).toBe(9);
            expect(settings.convertTo).toHaveBeenCalled();
            expect(typeof converted.error == "function" ? converted.error() : converted.error).toBe(settings.message);
        });
    });
});