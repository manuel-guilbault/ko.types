describe("number type tests", function () {
    it("works for integer", function () {
        expect(isType("number", 12)).toBe(true);
    });
    it("works for number", function () {
        expect(isType("number", 12.3)).toBe(true);
    });
    it("works for null", function () {
        expect(isType("number", null)).toBe(true);
    });
    it("works for undefined", function () {
        expect(isType("number", undefined)).toBe(true);
    });
    it("does not work for boolean", function () {
        expect(isType("number", true)).toBe(false);
    });
    it("does not work for string", function () {
        expect(isType("number", "toto")).toBe(false);
    });
    it("does not work for array", function () {
        expect(isType("number", [])).toBe(false);
    });
    it("does not work for object", function () {
        expect(isType("number", {})).toBe(false);
    });
});