class RgSidemenu {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._isvisible = opts.isvisible
    this._header = opts.header
    this._items = opts.items
    this._onselect = opts.onselect
    this._onopen = opts.onopen
    this._onclose = opts.onclose
  }

  get isvisible() {
    return rg.toBoolean(this._isvisible)
  }
  set isvisible(isvisible) {
    this._isvisible = isvisible
    this.trigger('visibility')
  }

  get header() {
    return this._header
  }
  set header(header) {
    this._header = header
    this.trigger('change')
  }

  get items() {
    if (rg.isArray(this._items)) return this._items
    this._items = []
    return this._items
  }
  set items(items) {
    this._items = items
    this.trigger('change')
  }

  get onopen() {
    if (rg.isFunction(this._onopen)) return this._onopen
    return null
  }
  set onopen(onopen) {
    this._onopen = onopen
  }

  get onclose() {
    if (rg.isFunction(this._onclose)) return this._onclose
    return null
  }
  set onclose(onclose) {
    this._onclose = onclose
  }

  get onselect() {
    if (rg.isFunction(this._onselect)) return this._onselect
    return null
  }
  set onselect(onselect) {
    this._onselect = onselect
  }

  open() {
    if (this.onopen && !this.isvisible) this.onopen()
    this.isvisible = true
  }

  close() {
    if (this.onclose && this.isvisible) this.onclose()
    this.isvisible = false
  }

  toggle() {
    this.isvisible = !this.isvisible
    if (this.onopen && this.isvisible) this.onopen()
    else if (this.onclose && !this.isvisible) this.onclose()
  }

  select(item) {
    this.items.forEach(item => item.active = false)
    item.active = true
    if (item.action) item.action(item)
    if (this.onselect) this.onselect(item)
  }
}
