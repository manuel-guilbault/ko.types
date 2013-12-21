describe("moment to date converter tests", function () {
    describe("convert to", function () {
        it("can convert null", function () {
            expect(convertTo("moment", "date", null)).toBe(null);
        });
        it("can convert undefined", function () {
            expect(convertTo("moment", "date", undefined)).toBe(undefined);
        });
        it("can convert moment to date", function () {
            var now = moment();
            expect(convertTo("moment", "date", now)).toBe(now.toDate());
        });
    });

    describe("convert from", function () {
        it("can convert null", function () {
            expect(convertFrom("moment", "date", null)).toBe(null);
        });
        it("can convert undefined", function () {
            expect(convertFrom("moment", "date", undefined)).toBe(undefined);
        });
        it("can convert date to moment", function () {
            var now = moment();
            expect(convertFrom("moment", "date", now.toDate())).toBeMoment(now);
        });
    });
});