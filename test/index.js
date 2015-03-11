var constant = require('../')
var fs = require('fs')
var test = require('tape')
var postcss = require('postcss')

function fixture (name) {
    return fs.readFileSync('test/fixtures/' + name + '.css', 'utf-8').trim()
}

function output (name) {
    return fs.readFileSync('test/fixtures/' + name + '.out.css', 'utf-8').trim()
}

test('throw error: Cannot cascade', function (t) {
    var res = function () {
        return postcss().use(constant(fixture('test-1'))).process(fixture('test-1')).css.trim()
    }
    t.throws(res, /Cannot cascade/)
    t.end()
})

test('throw error: Cannot cascade', function (t) {
    var res = function () {
        return postcss().use(constant(fixture('test-2'))).process(fixture('test-2')).css.trim()
    }
    t.throws(res, /Cannot cascade/)
    t.end()
})

test('throw error: Cannot cascade', function (t) {
    var res = function () {
        return postcss().use(constant(fixture('test-3'))).process(fixture('test-3')).css.trim()
    }
    t.throws(res, /Cannot cascade/)
    t.end()
})
