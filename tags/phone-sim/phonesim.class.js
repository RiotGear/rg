class RgPhoneSim extends RgTag {

  constructor(opts) {
    super()
    if (rg.isUndefined(opts)) opts = {}
    this._url = opts.url
  }

  get url() {
    return this._url || ''
  }
  set url(url) {
    this._url = url
  }
}
