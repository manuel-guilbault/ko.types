describe("boolean type tests", function () {
    it("works for true", function () {
        expect(ko.types.getType("boolean")(true)).toBe(true);
    });
    it("works for false", function () {
        expect(ko.types.getType("boolean")(false)).toBe(true);
    });
    it("works for null", function () {
        expect(ko.types.getType("boolean")(null)).toBe(true);
    });
    it("works for undefined", function () {
        expect(ko.types.getType("boolean")(undefined)).toBe(true);
    });
    it("does not work for string", function () {
        expect(ko.types.getType("boolean")("toto")).toBe(false);
    });
    it("does not work for int", function () {
        expect(ko.types.getType("boolean")(12)).toBe(false);
    });
    it("does not work for array", function () {
        expect(ko.types.getType("boolean")([])).toBe(false);
    });
    it("does not work for object", function () {
        expect(ko.types.getType("boolean")({})).toBe(false);
    });
});