class RgInclude {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._unsafe = opts.unsafe
    this._url = opts.url
  }

  get unsafe() {
    return rg.toBoolean(this._unsafe)
  }
  set unsafe(unsafe) {
    this._unsafe = unsafe
    this.trigger('change')
  }

  get url() {
    return this._url || ''
  }
  set url(url) {
    if (this.url != url) {
      this._url = url
      this.trigger('change')
    }
  }

  fetch() {
    rg.xhr('get', this.url, resp => {
      this.trigger('fetch', resp)
    })
  }
}
