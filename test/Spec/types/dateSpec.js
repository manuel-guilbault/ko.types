describe("date type tests", function () {
    it("works for date", function () {
        expect(isType("date", new Date())).toBe(true);
    });
    it("works for null", function () {
        expect(isType("date", null)).toBe(true);
    });
    it("works for undefined", function () {
        expect(isType("date", undefined)).toBe(true);
    });
    it("does not work for boolean", function () {
        expect(isType("date", true)).toBe(false);
    });
    it("does not work for string", function () {
        expect(isType("date", "toto")).toBe(false);
    });
    it("does not work for int", function () {
        expect(isType("date", 12)).toBe(false);
    });
    it("does not work for array", function () {
        expect(isType("date", [])).toBe(false);
    });
    it("does not work for object", function () {
        expect(isType("date", {})).toBe(false);
    });
});