interface String {
    firstLetterCapital: () => string,
    prettyDate: () => any
}

interface Date {
    prettyDate: ()=> any
}

String.prototype.firstLetterCapital = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}