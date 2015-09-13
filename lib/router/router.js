;(() => {
  // Polyfills
  Array.prototype.find=Array.prototype.find||(Array.prototype.find=function(r){if(null===this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var t,n=Object(this),e=n.length>>>0,o=arguments[1],i=0;e>i;i++)if(t=n[i],r.call(o,t,i,n))return t;return void 0});

  let _states = []

  const router = {
    add(state) {
      if (!state || !state.name) {
        throw 'Please specify a state name'
        return
      }
      let _state = findStateByName(state)
      if (_state) _state = state
      else _states.push(state)
      router.trigger('add', _state)
      return this
    },

    remove(name) {
      let _state = undefined
      _states = _states.filter(state => {
        if (state.name != name) return state
        else _state = state
      })
      router.trigger('remove', _state)
      return this
    },

    go(name, popped) {
      if (!router.active || !name) return
        // Match the state in the list of states, if no state available throw error
      let _state = findStateByName(name)
      if (!_state) {
        throw `State '${name}' has not been configured`
        return
      }

      // Merge the state options with the parent states
      let names = name.split('.') // ["about", "more", "all"]
      names = names.map((name, i) => {
        if (i > 0) {
          return names.slice(0, i).join('.') + '.' + name
        } else {
          return name
        }
      })
      names.forEach((name, i) => {
        if (i < names.length) {
          const _parent = findStateByName(name)
          _state = Object.assign({}, _parent, _state)
        }
      })

      // Resolve the resolve function
      if (typeof _state.resolve == 'function') {
        let promise = _state.resolve()
        if (typeof promise.then == 'function')
          promise.then(() => changeState(_state, popped))
      } else {
        changeState(_state, popped)
      }
      return this
    },

    start() {
      router.active = true
      if (window.location.hash) {
        const _state = findStateByUrl(window.location.hash.replace('#!/', ''))
        if (_state) router.go(_state.name)
      }
      window.addEventListener('popstate', handlePop)
      router.trigger('start')
      return this
    },

    stop() {
      router.active = false
      window.removeEventListener('popstate', handlePop)
      router.trigger('stop')
      return this
    },

    current: undefined,
    active: false
  }

  function findStateByName(name) {
    return _states.find(state => state.name == name)
  }

  function findStateByUrl(url) {
    return _states.find(state => state.url == url);
  }

  function handlePop(e) {
    if (e.state) router.go(e.state, true)
  }

  function changeState(state, popped) {
    // If supported
    if (typeof history.pushState != 'undefined' && state.history != false) {
      // New state
      if (!history.state || (history.state.name != state.name && !popped)) {
        const url = state.hasOwnProperty('url') ? `#!/${state.url}` : null
        history.pushState(state.name, null, url)
      }
    }
    const prevState = router.current
    router.current = state
    router.trigger('go', state, prevState)
  }

  riot.observable(router)
  riot.mixin('rg.router', {
    init: function() {
      this.router.on('go', () => this.update())
    },
    router
  })

  if (!window.rg) window.rg = {}
  window.rg.router = router
})()
