beforeEach(function () {
    this.addMatchers({
        toBeDate: function (expected) {
            return this.actual.getSeconds() == expected.getSeconds();
        }
    });
});