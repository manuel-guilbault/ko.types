describe("string type tests", function () {
    it("works for string", function () {
        expect(ko.types.getType("string")("toto")).toBe(true);
    });
    it("works for null", function () {
        expect(ko.types.getType("string")(null)).toBe(true);
    });
    it("works for undefined", function () {
        expect(ko.types.getType("string")(undefined)).toBe(true);
    });
    it("does not work for boolean", function () {
        expect(ko.types.getType("string")(true)).toBe(false);
    });
    it("does not work for integer", function () {
        expect(ko.types.getType("string")(12)).toBe(false);
    });
    it("does not work for array", function () {
        expect(ko.types.getType("string")([])).toBe(false);
    });
    it("does not work for object", function () {
        expect(ko.types.getType("string")({})).toBe(false);
    });
});