class RgInclude extends RgTag {

  constructor(opts) {
    super()
    if (rg.isUndefined(opts)) opts = {}
    this._unsafe = opts.unsafe
    this._url = opts.url
  }

  get unsafe() {
    return rg.toBoolean(this._unsafe)
  }
  set unsafe(unsafe) {
    this._unsafe = unsafe
  }

  get url() {
    return this._url || ''
  }
  set url(url) {
    if (this.url != url) {
      this._url = url
    }
  }

  fetch() {
    rg.xhr('get', this.url, resp => {
      this.trigger('fetch', resp)
    })
  }
}
