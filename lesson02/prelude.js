var prelude = function(expr) {
    notes = { tag: 'note', pitch: 'd4', dur: 500 };
    sequence = {
        tag: 'seq',
        left: notes,
        right: expr
    };
    return sequence;
};