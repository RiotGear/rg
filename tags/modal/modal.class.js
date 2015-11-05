class RgModal extends RgTag {

  constructor(opts) {
    super()
    this._isvisible = opts.isvisible
    this._dismissable = opts.dismissable
    this._ghost = opts.ghost
    this._heading = opts.heading
    this._buttons = opts.buttons
    this._onclose = opts.onclose
    this._onopen = opts.onopen
  }

  get dismissable() {
    if (rg.isUndefined(this._dismissable)) this._dismissable = true
    return rg.toBoolean(this._dismissable)
  }
  set dismissable(dismissable) {
    this._dismissable = dismissable
  }

  get ghost() {
    return rg.toBoolean(this._ghost)
  }
  set ghost(ghost) {
    this._ghost = ghost
  }

  get heading() {
    return this._heading || ''
  }
  set heading(heading) {
    this._heading = heading
  }

  get buttons() {
    if (rg.isArray(this._buttons)) return this._buttons
    return []
  }
  set buttons(buttons) {
    this._buttons = buttons
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

  get isvisible() {
    return rg.toBoolean(this._isvisible)
  }
  set isvisible(isvisible) {
    this._isvisible = isvisible
    if (this.isvisible && this.onopen) this.onopen()
    if (!this.isvisible && this.onclose) this.onclose()
  }
}
