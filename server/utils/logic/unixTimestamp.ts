interface Date {
    toUnixTimestamp(): number;
}

Date.prototype.toUnixTimestamp = function (): number {
    return this.getTime() / 1000;
}                                                                                                                 