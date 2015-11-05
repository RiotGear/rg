class RgBehold extends RgTag {

  constructor(opts) {
    super()
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
  }

  get image2() {
    return this._image2
  }
  set image2(img) {
    this._image2 = img
  }

  get mode() {
    return this._mode || 'swipe'
  }
  set mode(mode) {
    this._mode = mode
  }
}
