class RgMarkdown extends RgTag {

  constructor(opts) {
    super()
    if (rg.isUndefined(opts)) opts = {}
    if (commonmark) {
      this.reader = new commonmark.Parser()
      this.writer = new commonmark.HtmlRenderer()
    }
    this._url = opts.url
  }

  get url() {
    return this._url || ''
  }
  set url(url) {
    this._url = url
  }

  parse(md) {
    var parsed = this.reader.parse(md)
    this.trigger('parse', this.writer.render(parsed))
    return this.writer.render(parsed)
  }

  fetch() {
    rg.xhr('get', this.url, resp => {
      this.trigger('fetch', resp)
    })
  }
}
