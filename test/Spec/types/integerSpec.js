describe("integer type tests", function () {
    it("works for integer", function () {
        expect(ko.types.getType("integer")(12)).toBe(true);
    });
    it("works for null", function () {
        expect(ko.types.getType("integer")(null)).toBe(true);
    });
    it("works for undefined", function () {
        expect(ko.types.getType("integer")(undefined)).toBe(true);
    });
    it("does not work for boolean", function () {
        expect(ko.types.getType("integer")(true)).toBe(false);
    });
    it("does not work for string", function () {
        expect(ko.types.getType("integer")("toto")).toBe(false);
    });
    it("does not work for array", function () {
        expect(ko.types.getType("integer")([])).toBe(false);
    });
    it("does not work for object", function () {
        expect(ko.types.getType("integer")({})).toBe(false);
    });
});