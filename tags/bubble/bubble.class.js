class RgBubble extends RgTag {

  constructor(opts) {
    super()
    if (rg.isUndefined(opts)) opts = {}
    this._isvisible = opts.isvisible
    this._content = opts.content
  }

  get isvisible() {
    return rg.toBoolean(this._isvisible)
  }
  set isvisible(isvisible) {
    this._isvisible = isvisible
  }

  get content() {
    return this._content || ''
  }
  set content(content) {
    this._content = content
  }

  showBubble() {
    clearTimeout(this._timer)
    this.isvisible = true
  }

  hideBubble() {
    this._timer = setTimeout(() => {
      this.isvisible = false
      this.update()
    }, 1000)
  }

  toggleBubble() {
    this.isvisible = !this.isvisible
  }
}
