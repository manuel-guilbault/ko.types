describe("boolean to any converter tests", function () {
    describe("convert to", function () {
        it("value is passed unchanged", function () {
            var value = Math.random();
            expect(convertTo("boolean", "*", value)).toBe(value);
        });
    });

    describe("convert from", function () {
        it("can convert string to true", function () {
            expect(convertFrom("boolean", "*", "test")).toBe(true);
        });
        it("can convert empty string to false", function () {
            expect(convertFrom("boolean", "*", "")).toBe(false);
        });
        it("can convert undefined to false", function () {
            expect(convertFrom("boolean", "*", undefined)).toBe(false);
        });
        it("can convert null to false", function () {
            expect(convertFrom("boolean", "*", null)).toBe(false);
        });
        it("can convert positive integer to true", function () {
            expect(convertFrom("boolean", "*", 12)).toBe(true);
        });
        it("can convert zero to false", function () {
            expect(convertFrom("boolean", "*", 0)).toBe(false);
        });
        it("can convert NaN to false", function () {
            expect(convertFrom("boolean", "*", NaN)).toBe(false);
        });
        it("can convert array to true", function () {
            expect(convertFrom("boolean", "*", [])).toBe(true);
        });
        it("can convert object to true", function () {
            expect(convertFrom("boolean", "*", {})).toBe(true);
        });
        it("can convert function to true", function () {
            expect(convertFrom("boolean", "*", function() {})).toBe(true);
        });
    });
});