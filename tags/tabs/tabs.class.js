class RgTabs {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._tabs = opts.tabs
    this._onopen = opts.onopen
  }

  get onopen() {
    if (rg.isFunction(this._onopen)) return this._onopen
    return null
  }
  set onopen(onopen) {
    if (rg.isFunction(onopen)) this._onopen = onopen
    this.trigger('settings')
  }

  get tabs() {
    if (rg.isArray(this._tabs)) {
      let activeTab = false
      this._tabs.forEach((tab, i) => {
        tab.index = i

        if (activeTab) tab.active = false
        if (tab.active) activeTab = true
      })
      return this._tabs
    }
    return []
  }
  set tabs(tabs) {
    this._tabs = tabs
    this.trigger('change')
  }

  select(tab) {
    if (!tab.disabled) {
      this.tabs.forEach(tab => {
        tab.active = false
      })
      if (this.onopen) this.onopen(tab)
      tab.active = true
      this.trigger('select', tab)
    }
  }
}
