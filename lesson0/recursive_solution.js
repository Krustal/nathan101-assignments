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

var count = function(tree) {
  return tree && 1 + count(tree.left) + count(tree.right) || 0;
}

console.log(count(single_node));
console.log(count(shrub));