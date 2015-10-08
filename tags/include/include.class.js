class RgInclude {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._unsafe = opts.unsafe
    this._src = opts.src
  }

  get unsafe() {
    return rg.toBoolean(this._unsafe)
  }
  set unsafe(unsafe) {
    this._unsafe = unsafe
    this.trigger('change')
  }

  get src() {
    return this._src || ''
  }
  set src(src) {
    this._src = src
    this.trigger('change')
  }

  fetch() {
    rg.xhr('get', this.src, resp => {
      this.trigger('fetched', resp)
		})
  }
}
