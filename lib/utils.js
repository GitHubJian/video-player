var _toString = Object.prototype.toString
var _slice = Array.prototype.slice

function isArray(array) {
  return _toString.call(array) === '[object Array]'
}

function isObject(object) {
  return _toString.call(object) === '[object Object]'
}

function isPlainObject(object) {
  return isObject(object) && Object.getPrototypeOf(object) == Object.prototype
}

function _extend(target, source, deep) {
  for (var key in source) {
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
        target[key] = {}
      }
      if (isArray(source[key]) && !isArray(target[key])) {
        target[key] = []
      }
      _extend(target[key], source[key], deep)
    } else if (source[key] !== void 0) {
      target[key] = source[key]
    }
  }
}

function extend(target) {
  var deep,
    args = _slice.call(arguments, 1)

  if (typeof target == 'boolean') {
    deep = target
    target = args.shift()
  }

  var i, len
  for (i = 0, len = args.length; i < len; i++) {
    _extend(target, arg, deep)
  }

  return target
}

function clone(value, deep) {
  deep = deep === true

  return extend(deep, {}, value)
}

function addEvent(el, event, listener) {
  if (el.addEventListener) {
    return void el.addEventListener(event, listener, false)
  }

  var n = 'on' + event
  if (el.attachEvent) {
    return void el.attachEvent(n, listener)
  }

  var v = el[n]
  el[n] = function(e) {
    e = e || window.event
    listener.call(null, e)

    if (v) {
      v.call(null, e)
    }
  }
}

module.exports = {
  extend: extend,
  clone: clone,
  addEvent: addEvent
}
