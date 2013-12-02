describe("boolean type tests", function () {
    it("works for true", function () {
        expect(isType("boolean", true)).toBe(true);
    });
    it("works for false", function () {
        expect(isType("boolean", false)).toBe(true);
    });
    it("works for null", function () {
        expect(isType("boolean", null)).toBe(true);
    });
    it("works for undefined", function () {
        expect(isType("boolean", undefined)).toBe(true);
    });
    it("does not work for string", function () {
        expect(isType("boolean", "toto")).toBe(false);
    });
    it("does not work for int", function () {
        expect(isType("boolean", 12)).toBe(false);
    });
    it("does not work for array", function () {
        expect(isType("boolean", [])).toBe(false);
    });
    it("does not work for object", function () {
        expect(isType("boolean", {})).toBe(false);
    });
});