;
(() => {
  if (!window.rg) window.rg = {}
  window.rg.isUndefined = val => typeof val === 'undefined'
  window.rg.isDefined = val => typeof val !== 'undefined'
  window.rg.isBoolean = val => typeof val === 'boolean'
  window.rg.isObject = val => val !== null && typeof val === 'object'
  window.rg.isString = val => typeof val === 'string'
  window.rg.isNumber = val => typeof val === "number" && !isNaN(val)
  window.rg.isDate = val => toString.call(val) === '[object Date]'
  window.rg.isArray = Array.isArray
  window.rg.isFunction = val => typeof val === 'function'
  window.rg.isRegExp = val => toString.call(val) === '[object RegExp]'
  window.rg.isPromise = val => val && isFunction(val.then)
  window.rg.toBoolean = val => (val == 'true' || val == true)
  window.rg.toNumber = val => {
    val = Number(val)
    return window.rg.isNumber(val) ? val : 0
  }
  window.rg.noop = function() {}
})()
