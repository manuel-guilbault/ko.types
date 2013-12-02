describe("momentjs type tests", function () {
    it("works for moment", function () {
        expect(isType("moment", moment())).toBe(true);
    });
    it("works for null", function () {
        expect(isType("moment", null)).toBe(true);
    });
    it("works for undefined", function () {
        expect(isType("moment", undefined)).toBe(true);
    });
    it("does not work for boolean", function () {
        expect(isType("moment", true)).toBe(false);
    });
    it("does not work for integer", function () {
        expect(isType("moment", 12)).toBe(false);
    });
    it("does not work for string", function () {
        expect(isType("moment", "toto")).toBe(false);
    });
    it("does not work for array", function () {
        expect(isType("moment", [])).toBe(false);
    });
    it("does not work for object", function () {
        expect(isType("moment", {})).toBe(false);
    });
});