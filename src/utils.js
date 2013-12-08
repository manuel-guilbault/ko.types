ko.utils.extend(exports, {
    utils: {
        escapeRegExp: escapeRegExp
    }
});

function escapeRegExp(str) {
    // See http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}