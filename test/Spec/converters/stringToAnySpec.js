describe("string to any converter tests", function () {
    describe("convert to", function () {
        it("value is passed unchanged", function () {
            var value = Math.random();
            expect(convertTo("string", "*", value)).toBe(value);
        });
    });

    describe("convert from", function () {
        it("can convert undefined to string", function () {
            expect(convertFrom("string", "*", undefined)).toBe("");
        });
        it("can convert null to false", function () {
            expect(convertFrom("string", "*", null)).toBe("");
        });
        it("can convert true to string", function () {
            expect(convertFrom("string", "*", "test")).toBe("test");
        });
        it("can convert true to string", function () {
            expect(convertFrom("string", "*", true)).toBe("true");
        });
        it("can convert positive integer to string", function () {
            expect(convertFrom("string", "*", 12)).toBe("12");
        });
        it("can convert NaN to string", function () {
            expect(convertFrom("string", "*", NaN)).toBe("NaN");
        });
        it("can convert array to string", function () {
            var a = [2, 3];
            expect(convertFrom("string", "*", a)).toBe(a.toString());
        });
        it("can convert object to string", function () {
            var o = {};
            expect(convertFrom("string", "*", o)).toBe(o.toString());
        });
        it("can convert function to string", function () {
            var f = function () { };
            expect(convertFrom("string", "*", f)).toBe(f.toString());
        });
    });
});