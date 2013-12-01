beforeEach(function () {
    this.addMatchers({
        toBeDate: function (expected) {
            return this.actual.getSeconds() == expected.getSeconds();
        },
        toBeMoment: function (value, unit) {
            return this.actual.isSame(value, unit || "millisecond");
        }
    });
});