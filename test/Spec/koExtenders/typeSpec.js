describe('type extender tests', function () {
    describe('named types', function () {
        afterEach(function () {
            ko.types.removeType('test');
        });

        it('can read value', function () {
            ko.types.addType('test', function () { });

            var observable = ko.observable(12).extend({ type: 'test' });

            expect(observable()).toBe(12);
        });
        it('can write valid value', function () {
            var testValidator = jasmine.createSpy('testValidator').andReturn(true);
            ko.types.addType('test', testValidator);

            var observable = ko.observable(9).extend({ type: 'test' });

            var newValue = 12;
            observable(newValue);

            expect(observable()).toBe(newValue);
            expect(testValidator).toHaveBeenCalledWith(newValue);
        });
        it('cannot write invalid value', function () {
            var testValidator = jasmine.createSpy('testValidator').andReturn(false);
            ko.types.addType('test', testValidator);

            var observable = ko.observable(9).extend({ type: 'test' });
            var newValue = 'invalidValue';

            expect(function () { observable(newValue); }).toThrow(new TypeError('Invalid type : expected test.'));
            expect(testValidator).toHaveBeenCalledWith(newValue);
        });
    });

    describe('anonymous types', function () {
        it('can read value', function () {
            var observable = ko.observable(12).extend({ type: function () { } });

            expect(observable()).toBe(12);
        });
        it('can write valid value', function () {
            var testValidator = jasmine.createSpy('testValidator').andReturn(true);
            var observable = ko.observable(9).extend({ type: testValidator });

            var newValue = 12;
            observable(newValue);

            expect(observable()).toBe(newValue);
            expect(testValidator).toHaveBeenCalledWith(newValue);
        });
        it('cannot write invalid value', function () {
            var testValidator = jasmine.createSpy('testValidator').andReturn(false);
            var observable = ko.observable(9).extend({ type: testValidator });
            var newValue = 'invalidValue';

            expect(function () { observable(newValue); }).toThrow(new TypeError('Invalid type.'));
            expect(testValidator).toHaveBeenCalledWith(newValue);
        });
    });
});