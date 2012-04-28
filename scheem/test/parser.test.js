var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs');

var data = fs.readFileSync('../parser.peg', 'utf-8');
var parse = PEG.buildParser(data).parse;


assert.deepEqual( parse("atom"), "atom");
assert.deepEqual( parse("+"), "+");
assert.deepEqual( parse("(a b c)"), ["a", "b", "c"] );
assert.deepEqual( parse(" (a b c)"), ["a", "b", "c"] );
assert.deepEqual( parse(" (a b c)"), ["a", "b", "c"] );
assert.deepEqual( parse("(a   b c)"), ["a", "b", "c"] );
assert.deepEqual( parse("(a b c)"), ["a", "b", "c"] );
assert.deepEqual( parse("(+ x 3)"), ["+", "x", "3"] );
assert.deepEqual( parse("(+ 1 (f x 3 y))"), ["+", "1", ["f", "x", "3", "y"]]);
