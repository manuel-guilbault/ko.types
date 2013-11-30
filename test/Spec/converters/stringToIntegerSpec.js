describe('string to integer converter tests', function () {
    describe('convert to', function () {
        it('can convert string to undefined', function () {
            expect(convertTo('string', 'integer', '')).toBe(undefined);
        });
        it('can convert string to integer (strict)', function () {
            expect(convertTo('string', 'integer', '12', { 'strict': true })).toBe(12);
        });
        it('can convert string to integer (not strict)', function () {
            expect(convertTo('string', 'integer', '12 twelve')).toBe(12);
        });
        it('cannot convert invalid string to integer (strict)', function () {
            expect(function () {
                convertTo('string', 'integer', '12 twelve', { 'strict': true });
            }).toThrow(new TypeError('Invalid integer value.'));
        });
        it('cannot convert invalid string to integer (not strict)', function () {
            expect(function () {
                convertTo('string', 'integer', 'twelve');
            }).toThrow(new TypeError('Invalid integer value.'));
        });
    });

    describe('convert from', function () {
        it('can convert null to string', function () {
            expect(convertFrom('string', 'integer', null)).toBe('');
        });
        it('can convert undefined to string', function () {
            expect(convertFrom('string', 'integer', undefined)).toBe('');
        });
        it('can convert integer to string', function () {
            expect(convertFrom('string', 'integer', 12)).toBe('12');
        });
    });
});