describe("integer type tests", function () {
    it("works for integer", function () {
        expect(isType("integer", 12)).toBe(true);
    });
    it("works for null", function () {
        expect(isType("integer", null)).toBe(true);
    });
    it("works for undefined", function () {
        expect(isType("integer", undefined)).toBe(true);
    });
    it("does not work for boolean", function () {
        expect(isType("integer", true)).toBe(false);
    });
    it("does not work for string", function () {
        expect(isType("integer", "toto")).toBe(false);
    });
    it("does not work for array", function () {
        expect(isType("integer", [])).toBe(false);
    });
    it("does not work for object", function () {
        expect(isType("integer", {})).toBe(false);
    });
});