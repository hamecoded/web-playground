//Amobee algo interview question
var tree1 = {
    value: true,
    i: 1,
    left: {
        value: true,
        i: 2,
        left: {
        	value: false,
        	i: 40,
        	left: {
        		value: false,
        		i: 80
        	},
        	right: {
        		value: false,
        		i: 90
        	}
        },
        right: {
            value: false,
            i: 50
        }
    },
    right: {
        value: false,
        i: 3,
        left: {
            value: true,
            i: 6
        },
        right: {
            value: false,
            i: 70
        }
    }
};

/**
 * Runs over a Binary tree node and marks for delete all leaf nodes that have value set to false
 * return: {"value":true,"i":1,"left":{"value":true,"i":2,"left":{"value":false,"i":40,"left":{"value":false,"i":80,"delete":true},"right":{"value":false,"i":90,"delete":true},"delete":true},"right":{"value":false,"i":50,"delete":true}},"right":{"value":false,"i":3,"left":{"value":true,"i":6},"right":{"value":false,"i":70,"delete":true}}}
 **/
export function cleanTree(node = tree1) {
    var output = _cleanTree(node);
    return {
        description: 'clean tree',
        value: tree1
    }
}

function _cleanTree(node) {
    var isLeaf = (node.right == undefined && node.left == undefined);
    if (isLeaf) {
        if (node.value == false) {
            node.delete= true;
            return false;
        }
        return true;
    } else {
        var falseChildren;
        if (node.right) {
            falseChildren = _cleanTree(node.right);
        }
        if (node.left) {
            falseChildren = falseChildren || _cleanTree(node.left);
        }
        if (!falseChildren) {
            if (node.value == false) {
                node.delete= true;
                return false;
            }
            return true;
        }
    }
}
