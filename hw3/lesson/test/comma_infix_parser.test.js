var PEG = require('pegjs');
var assert = require('assert');
var fs = require('fs');

var data = fs.readFileSync('../comma_infix_parser.peg', 'utf-8');
console.log(data);

var parse = PEG.buildParser(data).parse;

assert.deepEqual( parse("1+2"), {tag:"+", left:"1", right:"2" });