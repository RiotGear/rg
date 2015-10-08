class RgMarkdown {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    if (commonmark) {
      this.reader = new commonmark.Parser()
      this.writer = new commonmark.HtmlRenderer()
    }
    this._src = opts.src
  }

  get src() {
    return this._src || ''
  }
  set src(src) {
    this._src = src
    this.trigger('change')
  }

  parse(md) {
    var parsed = this.reader.parse(md)
    this.trigger('parse', this.writer.render(parsed))
    return this.writer.render(parsed)
  }

  fetch() {
    rg.xhr('get', this.src, resp => {
      this.trigger('fetch', resp)
    })
  }
}
