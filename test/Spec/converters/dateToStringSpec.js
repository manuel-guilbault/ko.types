describe("string to date converter tests", function () {
    describe("convert to", function () {
        it("can convert string to undefined", function () {
            var date = new Date();
            expect(convertFrom("date", "string", "")).toBe(undefined);
        });
        it("can convert string to date", function () {
            var date = new Date();
            expect(convertFrom("date", "string", date.toString())).toBeDate(date);
        });
        it("cannot convert invalid string to date", function () {
            expect(function () {
                convertFrom("date", "string", "test");
            }).toThrow(new TypeError("Invalid date value."));
        });
    });

    describe("convert from", function () {
        it("can convert date to string (format: date)", function () {
            var date = new Date();
            expect(convertTo("date", "string", date, { format: "date" })).toBe(date.toDateString());
        });
        it("can convert date to string (format: iso)", function () {
            var date = new Date();
            expect(convertTo("date", "string", date, { format: "iso" })).toBe(date.toISOString());
        });
        it("can convert date to string (format: json)", function () {
            var date = new Date();
            expect(convertTo("date", "string", date, { format: "json" })).toBe(date.toJSON());
        });
        it("can convert date to string (format: localeDate)", function () {
            var date = new Date();
            expect(convertTo("date", "string", date, { format: "localeDate" })).toBe(date.toLocaleDateString());
        });
        it("can convert date to string (format: localeTime)", function () {
            var date = new Date();
            expect(convertTo("date", "string", date, { format: "localeTime" })).toBe(date.toLocaleTimeString());
        });
        it("can convert date to string (format: locale)", function () {
            var date = new Date();
            expect(convertTo("date", "string", date, { format: "locale" })).toBe(date.toLocaleString());
        });
        it("can convert date to string (format: time)", function () {
            var date = new Date();
            expect(convertTo("date", "string", date, { format: "time" })).toBe(date.toTimeString());
        });
        it("can convert date to string (format: utc)", function () {
            var date = new Date();
            expect(convertTo("date", "string", date, { format: "utc" })).toBe(date.toUTCString());
        });
        it("can convert date to string (format: default)", function () {
            var date = new Date();
            expect(convertTo("date", "string", date, { format: "default" })).toBe(date.toString());
        });
    });
});