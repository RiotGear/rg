class RgSelect {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._isvisible = opts.isvisible
    this._autocomplete = opts.autocomplete
    this._filterfield = opts.filterfield
    this._options = opts.options
    this._hasfilter = opts.hasfilter
    this._placeholder = opts.placeholder
    this._filterplaceholder = opts.filterplaceholder
    this._filtereditems = opts.filtereditems
    this._onopen = opts.onopen
    this._onclose = opts.onclose
    this._onselect = opts.onselect
    this._onfilter = opts.onfilter
  }

  get isvisible() {
    return rg.toBoolean(this._isvisible)
  }
  set isvisible(isvisible) {
    this._isvisible = isvisible
    this.trigger('visibility')
  }

  get autocomplete() {
    return rg.toBoolean(this._autocomplete)
  }
  set autocomplete(autocomplete) {
    this._autocomplete = autocomplete
    this.trigger('change')
  }

  get filterfield() {
    return this._filterfield || 'text'
  }
  set filterfield(filterfield) {
    this._filterfield = filterfield
    this.trigger('change')
  }

  get placeholder() {
    return this._placeholder
  }
  set placeholder(placeholder) {
    this._placeholder = placeholder
    this.trigger('change')
  }

  get filterplaceholder() {
    return this._filterplaceholder
  }
  set filterplaceholder(filterplaceholder) {
    this._filterplaceholder = filterplaceholder
    this.trigger('change')
  }

  get hasfilter() {
    return rg.toBoolean(this._hasfilter)
  }
  set hasfilter(hasfilter) {
    this._hasfilter = hasfilter
    this.trigger('change')
  }

  get options() {
    if (rg.isArray(this._options)) return this._options
    return []
  }
  set options(options) {
    if (!rg.isArray(options)) options = []
    options.forEach((item, i) => {
      item.index = i
      if (item.selected) this.select(item)
    })
    this._options = options
    this.trigger('change')
  }

  get filtereditems() {
    if (rg.isArray(this._filtereditems)) return this._filtereditems
    return []
  }
  set filtereditems(filtereditems) {
    this._filtereditems = filtereditems
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

  get onfilter() {
    if (rg.isFunction(this._onfilter)) return this._onfilter
    return null
  }
  set onfilter(onfilter) {
    this._onfilter = onfilter
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

  filter(text) {
    this.filtereditems = this.options.filter(item => {
      item.active = false
      const filterField = item[this.filterfield]
      if (rg.isUndefined(filterField)) return false
      if (text.length == 0 ||
        filterField.toString()
                   .toLowerCase()
                   .indexOf(text.toString().toLowerCase()) > -1)
        return true
    })
    if (this.onfilter) this.onfilter()
    this.trigger('filter')
  }

  select(item) {
    this.options.forEach(i => i.selected = false)
    item.selected = true
    if (this.onselect) this.onselect(item)
    this.isvisible = false
    if (this.autocomplete) this.filter(item[this.filterfield])
    this.trigger('select', item)
  }
}
