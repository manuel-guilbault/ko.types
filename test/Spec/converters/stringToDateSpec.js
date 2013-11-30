describe('string to date converter tests', function () {
    describe('convert to', function () {
        it('can convert string to undefined', function () {
            var date = new Date();
            expect(convertTo('string', 'date', '')).toBe(undefined);
        });
        it('can convert string to date', function () {
            var date = new Date();
            expect(convertTo('string', 'date', date.toString())).toBeDate(date);
        });
        it('cannot convert invalid string to date', function () {
            expect(function () {
                convertTo('string', 'date', 'test');
            }).toThrow(new TypeError('Invalid date value.'));
        });
    });

    describe('convert from', function () {
        it('can convert date to string (format: date)', function () {
            var date = new Date();
            expect(convertFrom('string', 'date', date, { format: 'date' })).toBe(date.toDateString());
        });
        it('can convert date to string (format: iso)', function () {
            var date = new Date();
            expect(convertFrom('string', 'date', date, { format: 'iso' })).toBe(date.toISOString());
        });
        it('can convert date to string (format: json)', function () {
            var date = new Date();
            expect(convertFrom('string', 'date', date, { format: 'json' })).toBe(date.toJSON());
        });
        it('can convert date to string (format: localeDate)', function () {
            var date = new Date();
            expect(convertFrom('string', 'date', date, { format: 'localeDate' })).toBe(date.toLocaleDateString());
        });
        it('can convert date to string (format: localeTime)', function () {
            var date = new Date();
            expect(convertFrom('string', 'date', date, { format: 'localeTime' })).toBe(date.toLocaleTimeString());
        });
        it('can convert date to string (format: locale)', function () {
            var date = new Date();
            expect(convertFrom('string', 'date', date, { format: 'locale' })).toBe(date.toLocaleString());
        });
        it('can convert date to string (format: time)', function () {
            var date = new Date();
            expect(convertFrom('string', 'date', date, { format: 'time' })).toBe(date.toTimeString());
        });
        it('can convert date to string (format: utc)', function () {
            var date = new Date();
            expect(convertFrom('string', 'date', date, { format: 'utc' })).toBe(date.toUTCString());
        });
        it('can convert date to string (format: default)', function () {
            var date = new Date();
            expect(convertFrom('string', 'date', date, { format: 'default' })).toBe(date.toString());
        });
    });
});