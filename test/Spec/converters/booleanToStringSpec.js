describe("boolean to string converter tests", function () {
    describe("convert to", function () {
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

    describe("convert from", function () {
        it("can convert string to undefined", function () {
            expect(convertFrom("boolean", "string", "")).toBe(undefined);
        });
        it("can convert string to true", function () {
            expect(convertFrom("boolean", "string", "true")).toBe(true);
        });
        it("can convert string to false", function () {
            expect(convertFrom("boolean", "string", "false")).toBe(false);
        });
        it("can convert string to true (with overwritten value)", function () {
            expect(convertFrom("boolean", "string", "Yes", { trueValues: ["yes"], falseValues: ["no"] })).toBe(true);
        });
        it("can convert string to false (with overwritten value)", function () {
            expect(convertFrom("boolean", "string", "No", { trueValues: ["yes"], falseValues: ["no"] })).toBe(false);
        });
        it("cannot convert invalid string to boolean", function () {
            expect(function () {
                convertFrom("boolean", "string", "test");
            }).toThrow(new TypeError("Invalid boolean value."));
        });
    });
});