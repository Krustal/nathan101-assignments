var single_node = {
  data: 'b',
  left: null,
  right: null
};

var shrub = {
    data: 'b',
    left: {
        data: 'a',
        left: null,
        right: null
    },
    right: null
};

var contains = function(tree, value) {
    var location = tree; // start at top of tree
    // keep searching until we hit a dead end
    while(location !== null) {
        // see if we match
        if(value === location.data) {
            return true;
        } else {
            // go down left or right side based on comparison
            if(value < location.data) {
                location = location.left;
            } else {
                location = location.right;
            }
        }
    }
    return false;
};