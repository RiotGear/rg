class RgToggle {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._checked = opts.checked
    this._ontoggle = opts.ontoggle
  }

  get checked() {
    return rg.toBoolean(this._checked)
  }
  set checked(checked) {
    this._checked = checked
    this.trigger('checked')
  }

  get ontoggle() {
    if (rg.isFunction(this._ontoggle)) return this._ontoggle
    return null
  }
  set ontoggle(ontoggle) {
    this._ontoggle = ontoggle
  }

  toggle() {
    this.checked = !this.checked
    if (this.ontoggle) this.ontoggle(this.checked)
  }
}
