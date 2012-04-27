var pointer = 0;
var pitchToMidi = function(pitch) {
  var baseMidi = 0;
  var modifier = 0;
  switch(pitch[0]){
    case 'a':
      baseMidi = 21;
      modifier = 1;
      break;
    case 'b':
      baseMidi = 23;
      modifier = 1;
      break;
    case 'c':
      baseMidi = 24;
      break;
    case 'd':
      baseMidi = 26;
      break;
    case 'e':
      baseMidi = 28;
      break;
    case 'f':
      baseMidi = 29;
      break;
    case 'g':
      baseMidi = 31;
      break;
    default:
      throw 'invalid note';
  }
  
  var midi = baseMidi + ((parseInt(pitch[1])-1+modifier) * 12);
  return midi;
}

var endTime = function (expr) {
    if(expr.tag == 'note' || expr.tag == 'rest'){
        return expr.dur;
    } else if(expr.tag == 'seq'){
        return endTime(expr.left) + endTime(expr.right);
    } else if(expr.tag == 'par'){
      return Math.max(endTime(expr.left), endTime(expr.right));
    }
};

var build_note = function(musexpr){
  if (musexpr.tag != 'note') throw 'only can build notes from notes'; 
  tag = {
    tag: 'note',
    pitch: pitchToMidi(musexpr.pitch),
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
  } else if (musexpr.tag == 'rest') {
    response.push({tag: 'note', start: pointer, dur: musexpr.dur});
    pointer += musexpr.dur;
    return response;
  } else if (musexpr.tag == 'seq') {
    [].push.apply(response, evaluate(musexpr.left));
    [].push.apply(response, evaluate(musexpr.right));
    return response;
  } else if (musexpr.tag == 'par') {
    var old_pointer = pointer; 
    [].push.apply(response, evaluate(musexpr.left));
    pointer = old_pointer; // the pointer should actuall advance between left and right
    [].push.apply(response, evaluate(musexpr.right));
    pointer = old_pointer + endTime(musexpr);
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
    left: {
      tag: 'seq',
      left: { tag: 'rest', dur: 100 },  
      right: { tag: 'note', pitch: 'c4', dur: 500 }
    },
    right: { tag: 'note', pitch: 'd4', dur: 500 } 
  } 
}

console.log(test);
console.log(compile(test));
console.log(pitchToMidi('a0') == 21);
console.log(pitchToMidi('a1') == 33);
console.log(pitchToMidi('g3') == 55);
console.log(pitchToMidi('e6') == 88);