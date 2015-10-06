class RgContextMenu {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this.name = opts.name
    this._isvisible = opts.isvisible
    this._onclose = opts.onclose
    this._onopen = opts.onopen
    this._items = []
    if (!rg.isArray(opts.items)) return
    opts.items.forEach((item) => {
      this.add(item)
    })
  }

  get items() {
    if (rg.isArray(this._items)) return this._items
    return []
  }
  set items(items) {
    this._items = items
    this.trigger('items')
  }

  get onopen() {
    if (rg.isFunction(this._onopen)) return this._onopen
    return null
  }
  set onopen(onopen) {
    if (rg.isFunction(onopen)) this._onopen = onopen
    this.trigger('settings')
  }

  get onclose() {
    if (rg.isFunction(this._onclose)) return this._onclose
    return null
  }
  set onclose(onclose) {
    if (rg.isFunction(onclose)) this._onclose = onclose
    this.trigger('settings')
  }

  get isvisible() {
    return rg.toBoolean(this._isvisible)
  }
  set isvisible(isvisible) {
    this._isvisible = rg.toBoolean(isvisible)
    this.trigger('visibility')
  }

  add(item) {
    item.id = rg.uid()
    if (rg.isUndefined(item.isvisible)) item.isvisible = true
    if (rg.isUndefined(item.inactive)) item.inactive = false
    if (!rg.isFunction(item.onclick)) item.onclick = null
    this._items.push(item)
    this.trigger('add', item)
  }

  select(item) {
    if (!item.inactive) {
      if (rg.isFunction(item.onclick)) item.onclick(item)
      this.isvisible = false
      this.trigger('onclick', item)
    }
  }
}
