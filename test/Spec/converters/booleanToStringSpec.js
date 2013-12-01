describe("string to boolean converter tests", function () {
    describe("convert to", function () {
        it("can convert string to undefined (strict)", function () {
            expect(convertFrom("boolean", "string", "", { "strict": true })).toBe(undefined);
        });
        it("can convert string to true (strict)", function () {
            expect(convertFrom("boolean", "string", "true", { "strict": true })).toBe(true);
        });
        it("can convert string to false (strict)", function () {
            expect(convertFrom("boolean", "string", "false", { "strict": true })).toBe(false);
        });
        it("can convert string to true (not strict)", function () {
            expect(convertFrom("boolean", "string", "something")).toBe(true);
        });
        it("can convert string to false (not strict)", function () {
            expect(convertFrom("boolean", "string", "")).toBe(false);
        });
        it("cannot convert invalid string to boolean (strict)", function () {
            expect(function () {
                convertFrom("boolean", "string", "test", { "strict": true });
            }).toThrow(new TypeError("Invalid boolean value."));
        });
    });

    describe("convert from", function () {
        it("can convert null to string", function () {
            expect(convertTo("boolean", "string", null)).toBe("");
        });
        it("can convert undefined to string", function () {
            expect(convertTo("boolean", "string", undefined)).toBe("");
        });
        it("can convert true to string", function () {
            expect(convertTo("boolean", "string", true)).toBe("true");
        });
        it("can convert false to string", function () {
            expect(convertTo("boolean", "string", false)).toBe("false");
        });
    });
});