describe("number type tests", function () {
    it("works for integer", function () {
        expect(ko.types.getType("number")(12)).toBe(true);
    });
    it("works for number", function () {
        expect(ko.types.getType("number")(12.3)).toBe(true);
    });
    it("works for null", function () {
        expect(ko.types.getType("number")(null)).toBe(true);
    });
    it("works for undefined", function () {
        expect(ko.types.getType("number")(undefined)).toBe(true);
    });
    it("does not work for boolean", function () {
        expect(ko.types.getType("number")(true)).toBe(false);
    });
    it("does not work for string", function () {
        expect(ko.types.getType("number")("toto")).toBe(false);
    });
    it("does not work for array", function () {
        expect(ko.types.getType("number")([])).toBe(false);
    });
    it("does not work for object", function () {
        expect(ko.types.getType("number")({})).toBe(false);
    });
});