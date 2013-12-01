describe("globalized-date to string converter tests", function () {
    describe("convert to", function () {
        it("can convert null to string", function () {
            expect(convertTo("globalized-date", "string", null)).toBe("");
        });
        it("can convert undefined to string", function () {
            expect(convertTo("globalized-date", "string", undefined)).toBe("");
        });
        it("can convert date to string", function () {
            var now = new Date();
            expect(convertTo("globalized-date", "string", now)).toBe(Globalize.format(now, "d", "en"));
        });
        it("can convert date to string, with format and language", function () {
            var now = new Date();
            expect(convertTo("globalized-date", "string", now, { culture: "fr", format: "F" })).toBe(Globalize.format(now, "F", "fr"));
        });
    });

    describe("convert from", function () {
        it("can convert string to undefined", function () {
            expect(convertFrom("globalized-date", "string", "")).toBe(undefined);
        });
        it("can convert string to date", function () {
            var d = new Date("01/01/2013");
            expect(convertFrom("globalized-date", "string", Globalize.format(d, "d", "en"))).toBeDate(d);
        });
        it("can convert string to date, with format and language", function () {
            var now = new Date();
            expect(convertFrom("globalized-date", "string", Globalize.format(now, "F", "fr"), { culture: "fr", format: "F" })).toBeDate(now);
        });
    });
});