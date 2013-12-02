describe("type extender tests", function () {
    describe("named types", function () {
        afterEach(function () {
            ko.types.removeType("test");
        });

        it("cannot create with invalid value", function () {
            var testValidator = jasmine.createSpy("testValidator").andReturn(false);
            ko.types.addType("test", testValidator);

            expect(function () { ko.observable(12).extend({ type: "test" }); }).toThrow(new TypeError("Invalid type : expected test."));
            expect(testValidator).toHaveBeenCalledWith(12, jasmine.any(Object));
        });
        it("can read value", function () {
            var testValidator = jasmine.createSpy("testValidator").andReturn(true);
            ko.types.addType("test", testValidator);

            var observable = ko.observable(12).extend({ type: "test" });

            expect(observable()).toBe(12);
        });
        it("can write valid value", function () {
            var testValidator = jasmine.createSpy("testValidator").andReturn(true);
            ko.types.addType("test", testValidator);

            var observable = ko.observable(9).extend({ type: "test" });

            var newValue = 12;
            observable(newValue);

            expect(observable()).toBe(newValue);
            expect(testValidator.mostRecentCall.args[0]).toEqual(newValue);
        });
        it("cannot write invalid value", function () {
            var testValidator = jasmine.createSpy("testValidator").andReturn(true);
            ko.types.addType("test", testValidator);

            var observable = ko.observable(9).extend({ type: "test" });
            var newValue = "invalidValue";

            testValidator.andReturn(false);

            expect(function () { observable(newValue); }).toThrow(new TypeError("Invalid type : expected test."));
            expect(testValidator.mostRecentCall.args[0]).toEqual(newValue);
        });
    });

    describe("anonymous types", function () {
        it("cannot create with invalid value", function () {
            var testValidator = jasmine.createSpy("testValidator").andReturn(false);

            expect(function () { ko.observable(12).extend({ type: testValidator }); }).toThrow(new TypeError("Invalid type."));
            expect(testValidator).toHaveBeenCalledWith(12, jasmine.any(Object));
        });
        it("can read value", function () {
            var testValidator = jasmine.createSpy("testValidator").andReturn(true);

            var observable = ko.observable(12).extend({ type: testValidator });

            expect(observable()).toBe(12);
        });
        it("can write valid value", function () {
            var testValidator = jasmine.createSpy("testValidator").andReturn(true);
            var observable = ko.observable(9).extend({ type: { isValid: testValidator } });

            var newValue = 12;
            observable(newValue);

            expect(observable()).toBe(newValue);
            expect(testValidator.mostRecentCall.args[0]).toEqual(newValue);
        });
        it("cannot write invalid value", function () {
            var testValidator = jasmine.createSpy("testValidator").andReturn(true);
            var observable = ko.observable(9).extend({ type: { isValid: testValidator } });
            var newValue = "invalidValue";

            testValidator.andReturn(false);

            expect(function () { observable(newValue); }).toThrow(new TypeError("Invalid type."));
            expect(testValidator.mostRecentCall.args[0]).toEqual(newValue);
        });
        it("can write valid value (function only)", function () {
            var testValidator = jasmine.createSpy("testValidator").andReturn(true);
            var observable = ko.observable(9).extend({ type: testValidator });

            var newValue = 12;
            observable(newValue);

            expect(observable()).toBe(newValue);
            expect(testValidator.mostRecentCall.args[0]).toEqual(newValue);
        });
        it("cannot write invalid value (function only)", function () {
            var testValidator = jasmine.createSpy("testValidator").andReturn(true);
            var observable = ko.observable(9).extend({ type: testValidator });
            var newValue = "invalidValue";

            testValidator.andReturn(false);

            expect(function () { observable(newValue); }).toThrow(new TypeError("Invalid type."));
            expect(testValidator.mostRecentCall.args[0]).toEqual(newValue);
        });
    });
});