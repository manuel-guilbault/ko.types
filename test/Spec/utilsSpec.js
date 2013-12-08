describe("utils tests", function () {
    describe("escapeRegExp", function () {
        it("can escape all special chars", function () {
            var toEscape = "-[]/{}()*+?.\\^$|";
            var escaped = "\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|";
            expect(ko.types.utils.escapeRegExp(toEscape)).toBe(escaped);
        });
        it("does not escape other chars", function () {
            var toTest = "12345 abscedf";
            expect(ko.types.utils.escapeRegExp(toTest)).toBe(toTest);
        });
    });
});