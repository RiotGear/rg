;
(() => {
  const map = {
    initialize: () => {
      map.trigger('initialize')
    }
  }

  riot.observable(map)
  rg.map = map
})()
