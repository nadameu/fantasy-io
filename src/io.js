'use strict';

const daggy = require('daggy');
const {constant} = require('fantasy-combinators');

const IO = daggy.tagged('unsafePerform');

// Methods
IO.of = (x) => IO(constant(x));

IO.prototype.chain = function(g) {
    return IO(() => g(this.unsafePerform()).unsafePerform());
};

// Derived
IO.prototype.map = function(f) {
    return this.chain((a) => IO.of(f(a)));
};

IO.prototype.ap = function(a) {
    return this.chain((f) => a.map(f));
};

// Export
if (typeof module != 'undefined')
    module.exports = IO;