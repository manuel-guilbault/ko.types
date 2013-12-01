describe("moment to string converter tests", function () {
    describe("convert to", function () {
        it("can convert null to string", function () {
            expect(convertTo("moment", "string", null)).toBe("");
        });
        it("can convert undefined to string", function () {
            expect(convertTo("moment", "string", undefined)).toBe("");
        });
        it("can convert moment to string", function () {
            var now = moment();
            expect(convertTo("moment", "string", now)).toBe(now.format("L"));
        });
        it("can convert moment to string, with format and language", function () {
            var now = moment();
            expect(convertTo("moment", "string", now, { language: "fr", format: "LLLL" })).toBe(now.lang("fr").format("LLLL"));
        });
    });

    describe("convert from", function () {
        it("can convert string to undefined", function () {
            expect(convertFrom("moment", "string", "")).toBe(undefined);
        });
        it("can convert string to moment", function () {
            var now = moment();
            expect(convertFrom("moment", "string", now.format("L"))).toBeMoment(now, "day");
        });
        it("can convert string to moment, with format and language", function () {
            var now = moment();
            expect(convertFrom("moment", "string", now.lang("fr").format("LLLL"), { language: "fr", format: "LLLL" })).toBeMoment(now, "day");
        });
    });
});