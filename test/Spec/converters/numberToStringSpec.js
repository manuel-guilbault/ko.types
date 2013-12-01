describe("number to string converter tests", function () {
    describe("convert to", function () {
        it("can convert null to string", function () {
            expect(convertTo("number", "string", null)).toBe("");
        });
        it("can convert undefined to string", function () {
            expect(convertTo("number", "string", undefined)).toBe("");
        });
        it("can convert number to string", function () {
            expect(convertTo("number", "string", 12.2)).toBe("12.2");
        });
        it("can convert number to string with decimals", function () {
            expect(convertTo("number", "string", 12.222, { decimals: 2 })).toBe("12.22");
        });
    });

    describe("convert from", function () {
        it("can convert string to undefined", function () {
            expect(convertFrom("number", "string", "")).toBe(undefined);
        });
        it("can convert string to number (strict)", function () {
            expect(convertFrom("number", "string", "12.2", { "strict": true })).toBe(12.2);
        });
        it("can convert string to number (not strict)", function () {
            expect(convertFrom("number", "string", "12.2 twelve")).toBe(12.2);
        });
        it("cannot convert invalid string to number (strict)", function () {
            expect(function () {
                convertFrom("number", "string", "12.2 twelve", { "strict": true });
            }).toThrow(new TypeError("Invalid number value."));
        });
        it("cannot convert invalid string to number (not strict)", function () {
            expect(function () {
                convertFrom("number", "string", "twelve");
            }).toThrow(new TypeError("Invalid number value."));
        });
    });
});