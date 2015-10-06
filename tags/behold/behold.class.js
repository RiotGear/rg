class RgBehold {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._image1 = opts.image1
    this._image2 = opts.image2
    this._mode = opts.mode
  }

  get image1() {
    return this._image1
  }
  set image1(img) {
    this._image1 = img
    this.trigger('image')
  }

  get image2() {
    return this._image2
  }
  set image2(img) {
    this._image2 = img
    this.trigger('image')
  }

  get mode() {
    return this._mode || 'swipe'
  }
  set mode(mode) {
    this.trigger('mode')
    this._mode = mode
  }
}
