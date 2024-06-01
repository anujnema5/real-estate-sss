interface String {
    firstLetterCapital: ()=> string;
}

String.prototype.firstLetterCapital = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}