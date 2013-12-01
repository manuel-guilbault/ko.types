describe("string to integer converter tests", function () {
    describe("convert to", function () {
        it("can convert string to undefined", function () {
            expect(convertFrom("integer", "string", "")).toBe(undefined);
        });
        it("can convert string to integer (strict)", function () {
            expect(convertFrom("integer", "string", "12", { "strict": true })).toBe(12);
        });
        it("can convert string to integer (not strict)", function () {
            expect(convertFrom("integer", "string", "12 twelve")).toBe(12);
        });
        it("cannot convert invalid string to integer (strict)", function () {
            expect(function () {
                convertFrom("integer", "string", "12 twelve", { "strict": true });
            }).toThrow(new TypeError("Invalid integer value."));
        });
        it("cannot convert invalid string to integer (not strict)", function () {
            expect(function () {
                convertFrom("integer", "string", "twelve");
            }).toThrow(new TypeError("Invalid integer value."));
        });
    });

    describe("convert from", function () {
        it("can convert null to string", function () {
            expect(convertTo("integer", "string", null)).toBe("");
        });
        it("can convert undefined to string", function () {
            expect(convertTo("integer", "string", undefined)).toBe("");
        });
        it("can convert integer to string", function () {
            expect(convertTo("integer", "string", 12)).toBe("12");
        });
    });
});