describe('string to boolean converter tests', function () {
    describe('convert to', function () {
        it('can convert string to undefined (strict)', function () {
            expect(convertTo('string', 'boolean', '', { 'strict': true })).toBe(undefined);
        });
        it('can convert string to true (strict)', function () {
            expect(convertTo('string', 'boolean', 'true', { 'strict': true })).toBe(true);
        });
        it('can convert string to false (strict)', function () {
            expect(convertTo('string', 'boolean', 'false', { 'strict': true })).toBe(false);
        });
        it('can convert string to true (not strict)', function () {
            expect(convertTo('string', 'boolean', 'something')).toBe(true);
        });
        it('can convert string to false (not strict)', function () {
            expect(convertTo('string', 'boolean', '')).toBe(false);
        });
        it('cannot convert invalid string to boolean (strict)', function () {
            expect(function () {
                convertTo('string', 'boolean', 'test', { 'strict': true });
            }).toThrow(new TypeError('Invalid boolean value.'));
        });
    });

    describe('convert from', function () {
        it('can convert null to string', function () {
            expect(convertFrom('string', 'boolean', null)).toBe('');
        });
        it('can convert undefined to string', function () {
            expect(convertFrom('string', 'boolean', undefined)).toBe('');
        });
        it('can convert true to string', function () {
            expect(convertFrom('string', 'boolean', true)).toBe('true');
        });
        it('can convert false to string', function () {
            expect(convertFrom('string', 'boolean', false)).toBe('false');
        });
    });
});