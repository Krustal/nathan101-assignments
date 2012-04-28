var endTime = function (time, expr) {
    if(expr.tag == 'note'){
        return time + expr.dur;
    } else if(expr.tag == 'seq'){
        return time + endTime(0, expr.left) + endTime(0, expr.right);
    }
};
// maybe some helper functions
var pointer = 0;

var build_note = function(musexpr){
  if (musexpr.tag != 'note') throw 'only can build notes from notes'; 
  tag = {
    tag: 'note',
    pitch: musexpr.pitch,
    start: pointer,
    dur: musexpr.dur
  };
  pointer += musexpr.dur;
  return tag;
};

var evaluate = function(musexpr) {
  if (musexpr.tag == 'note') {
    return [build_note(musexpr)];
  } else if (musexpr.tag == 'seq') {
    var response = [];
    [].push.apply(response, evaluate(musexpr.left));
    [].push.apply(response, evaluate(musexpr.right));
    return response;
  }
};

var compile = function(musexpr) {
  pointer = 0;
  endTime(0, musexpr);
  compiled = evaluate(musexpr);
  return compiled;
};

test = { 
  tag: 'seq',
  left: { 
    tag: 'seq',
    left: { tag: 'note', pitch: 'a4', dur: 250 },
    right: { tag: 'note', pitch: 'b4', dur: 250 } 
  },
  right: { 
    tag: 'seq',
    left: { tag: 'note', pitch: 'c4', dur: 500 },
    right: { tag: 'note', pitch: 'd4', dur: 500 } 
  } 
}

console.log(compile(test));