class RgBubble {

  constructor(opts) {
    riot.observable(this)
    this._content = opts.content
  }

  get content() {
    return this._content || ''
  }
  set content(content) {
    this._content = content
    this.trigger('content')
  }
}
