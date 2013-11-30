describe('string to number converter tests', function () {
    describe('convert to', function () {
        it('can convert string to undefined', function () {
            expect(convertTo('string', 'number', '')).toBe(undefined);
        });
        it('can convert string to number (strict)', function () {
            expect(convertTo('string', 'number', '12.2', { 'strict': true })).toBe(12.2);
        });
        it('can convert string to number (not strict)', function () {
            expect(convertTo('string', 'number', '12.2 twelve')).toBe(12.2);
        });
        it('cannot convert invalid string to number (strict)', function () {
            expect(function () {
                convertTo('string', 'number', '12.2 twelve', { 'strict': true });
            }).toThrow(new TypeError('Invalid number value.'));
        });
        it('cannot convert invalid string to number (not strict)', function () {
            expect(function () {
                convertTo('string', 'number', 'twelve');
            }).toThrow(new TypeError('Invalid number value.'));
        });
    });

    describe('convert from', function () {
        it('can convert null to string', function () {
            expect(convertFrom('string', 'number', null)).toBe('');
        });
        it('can convert undefined to string', function () {
            expect(convertFrom('string', 'number', undefined)).toBe('');
        });
        it('can convert number to string', function () {
            expect(convertFrom('string', 'number', 12.2)).toBe('12.2');
        });
        it('can convert number to string with decimals', function () {
            expect(convertFrom('string', 'number', 12.222, { decimals: 2 })).toBe('12.22');
        });
    });
});