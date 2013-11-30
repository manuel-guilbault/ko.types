describe('momentjs type tests', function () {
    it('works for moment', function () {
        expect(ko.types.getType('moment')(moment())).toBe(true);
    });
    it('works for null', function () {
        expect(ko.types.getType('moment')(null)).toBe(true);
    });
    it('works for undefined', function () {
        expect(ko.types.getType('moment')(undefined)).toBe(true);
    });
    it('does not work for boolean', function () {
        expect(ko.types.getType('moment')(true)).toBe(false);
    });
    it('does not work for integer', function () {
        expect(ko.types.getType('moment')(12)).toBe(false);
    });
    it('does not work for string', function () {
        expect(ko.types.getType('moment')('toto')).toBe(false);
    });
    it('does not work for array', function () {
        expect(ko.types.getType('moment')([])).toBe(false);
    });
    it('does not work for object', function () {
        expect(ko.types.getType('moment')({})).toBe(false);
    });
});