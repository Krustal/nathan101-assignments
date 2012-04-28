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
  var todo = [tree], nodes = 0;
  while(todo.length > 0){
    node = todo.pop();
    if(!node)
      continue;
    nodes += node && 1 || 0;
    todo.push(node.left, node.right);
  }
  return nodes;
};

console.log(count(single_node));
console.log(count(shrub));