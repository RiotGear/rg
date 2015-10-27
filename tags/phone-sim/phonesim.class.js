class RgPhoneSim {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._url = opts.url
  }

  get url() {
    return this._url || ''
  }
  set url(url) {
    this._url = url
    this.trigger('change')
  }
}
