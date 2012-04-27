var reverse = function(expr) {
    if (expr.tag == 'note'){
        return expr;
    } else if(expr.tag == 'seq'){
        reversed = {
            tag: 'seq',
            left: reverse(expr.right),
            right: reverse(expr.left)
        };
        return reversed;
    }
};