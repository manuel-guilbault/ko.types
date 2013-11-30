describe('date type tests', function () {
    it('works for date', function () {
        expect(ko.types.getType('date')(new Date())).toBe(true);
    });
    it('works for null', function () {
        expect(ko.types.getType('date')(null)).toBe(true);
    });
    it('works for undefined', function () {
        expect(ko.types.getType('date')(undefined)).toBe(true);
    });
    it('does not work for boolean', function () {
        expect(ko.types.getType('date')(true)).toBe(false);
    });
    it('does not work for string', function () {
        expect(ko.types.getType('date')('toto')).toBe(false);
    });
    it('does not work for int', function () {
        expect(ko.types.getType('date')(12)).toBe(false);
    });
    it('does not work for array', function () {
        expect(ko.types.getType('date')([])).toBe(false);
    });
    it('does not work for object', function () {
        expect(ko.types.getType('date')({})).toBe(false);
    });
});