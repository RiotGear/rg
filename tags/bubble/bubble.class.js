class RgBubble {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this.isvisible = opts.isvisible
    this._content = opts.content
  }

  get isvisible() {
    return rg.toBoolean(this._isvisible)
  }
  set isvisible(isvisible) {
    this._isvisible = isvisible
    this.trigger('visibility')
  }

  get content() {
    return this._content || ''
  }
  set content(content) {
    this._content = content
    this.trigger('content')
  }

  showBubble() {
    clearTimeout(this._timer)
    this.isvisible = true
  }

  hideBubble() {
    this._timer = setTimeout(() => {
      this.isvisible = false
    }, 1000)
  }

  toggleBubble() {
    this.isvisible = !this.isvisible
  }
}
