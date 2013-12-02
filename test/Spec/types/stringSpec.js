describe("string type tests", function () {
    it("works for string", function () {
        expect(isType("string", "toto")).toBe(true);
    });
    it("works for null", function () {
        expect(isType("string", null)).toBe(true);
    });
    it("works for undefined", function () {
        expect(isType("string", undefined)).toBe(true);
    });
    it("does not work for boolean", function () {
        expect(isType("string", true)).toBe(false);
    });
    it("does not work for integer", function () {
        expect(isType("string", 12)).toBe(false);
    });
    it("does not work for array", function () {
        expect(isType("string", [])).toBe(false);
    });
    it("does not work for object", function () {
        expect(isType("string", {})).toBe(false);
    });
});