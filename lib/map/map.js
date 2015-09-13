;
(() => {
  const map = {
    initialize: () => {
      map.trigger('initialize')
    }
  }

  riot.observable(map)
  if (!window.rg) window.rg = {}
  window.rg.map = map
})()
