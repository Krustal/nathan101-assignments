var endTime = function (time, expr) {
    if(expr.tag == 'note'){
        return time + expr.dur;
    } else if(expr.tag == 'seq'){
        return time + endTime(0, expr.left) + endTime(0, expr.right);
    } else if(expr.tag == 'par'){
      return time + Math.max(endTime(0, expr.left), endTime(0, expr.right));
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
  var response = [];
  if (musexpr.tag == 'note') {
    return [build_note(musexpr)];
  } else if (musexpr.tag == 'seq') {
    [].push.apply(response, evaluate(musexpr.left));
    [].push.apply(response, evaluate(musexpr.right));
    return response;
  } else if (musexpr.tag == 'par') {
    var old_pointer = pointer; 
    [].push.apply(response, evaluate(musexpr.left));
    pointer = old_pointer;
    [].push.apply(response, evaluate(musexpr.right));
    pointer = old_pointer + endTime(0, musexpr);
    return response;
  }
};

var compile = function(musexpr) {
  pointer = 0;
  compiled = evaluate(musexpr);
  return compiled;
};

test = { 
  tag: 'seq',
  left: { 
    tag: 'par',
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