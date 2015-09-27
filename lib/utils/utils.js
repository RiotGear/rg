;
(() => {
  if (!window.rg) window.rg = {}
  rg.isUndefined = val => typeof val === 'undefined'
  rg.isDefined = val => typeof val !== 'undefined'
  rg.isBoolean = val => typeof val === 'boolean'
  rg.isObject = val => val !== null && typeof val === 'object'
  rg.isString = val => typeof val === 'string'
  rg.isNumber = val => typeof val === "number" && !isNaN(val)
  rg.isDate = val => toString.call(val) === '[object Date]'
  rg.isArray = Array.isArray
  rg.isFunction = val => typeof val === 'function'
  rg.isRegExp = val => toString.call(val) === '[object RegExp]'
  rg.isPromise = val => val && isFunction(val.then)
  rg.toBoolean = val => (val == 'true' || val == true)
  rg.toNumber = val => {
    val = Number(val)
    return rg.isNumber(val) ? val : 0
  }
  rg.xhr = function(method, src, onload) {
    const req = new XMLHttpRequest()
    req.onload = function() {
      onload(req.responseText)
    }
    req.open(method, src, true)
    req.send()
  }
})()
