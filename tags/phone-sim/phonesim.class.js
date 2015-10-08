class RgPhoneSim {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._src = opts.src
  }

  get src() {
    return this._src || ''
  }
  set src(src) {
    this._src = src
    this.trigger('change')
  }
}
