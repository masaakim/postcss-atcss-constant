var annotationBlock = require('css-annotation-block')
var postcss = require('postcss')

module.exports = function plugin (css, options) {
    options = options || {}

    var blocks = annotationBlock(css)

    var constantNodes = []
    blocks.forEach(function (block) {
        if (block.name === "constant") {
            constantNodes.push(block.nodes)
        }
    })
    var strings = []
    constantNodes.forEach(function (constantNode) {
        strings.push(constantNode.toString().split(',').join('').trim())
    })

    return function (root) {
        strings.forEach(function (string) {
            var ast = postcss.parse(string)
            ast.eachRule(function (rule) {
                var nextRule = rule.next()
                while (nextRule) {
                    var selArray = nextRule.selector.split(' ')
                    var lastName = selArray[selArray.length - 1]
                    if (rule.selector === nextRule.selector || rule.selector === lastName) {
                        throw new Error('Cannot cascade any rule sets in constant block')
                    }
                    nextRule = nextRule.next()
                }
            })
        })

        return root
    }
}
