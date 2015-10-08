class RgUnsplash {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._width = opts.width
    this._height = opts.height
		this._greyscale = opts.greyscale || opts.grayscale
		this._random = opts.random
		this._blur = opts.blur
		this._image = opts.image
		this._gravity = opts.gravity
  }

  get width() {
    return rg.toNumber(this._width) || 450
  }
  set width(width) {
    this._width = width
    this.trigger('change')
  }

  get height() {
    return rg.toNumber(this._height) || 250
  }
  set height(height) {
    this._height = height
    this.trigger('change')
  }

  get greyscale() {
    return rg.toBoolean(this._greyscale)
  }
  set greyscale(greyscale) {
    this._greyscale = greyscale
    this.trigger('change')
  }

  get grayscale() {
    return this.greyscale
  }

  set grayscale(grayscale) {
    this.greyscale = grayscale
  }

  get random() {
    return rg.toBoolean(this._random)
  }
  set random(random) {
    this._random = random
    this.trigger('change')
  }

  get blur() {
    return rg.toBoolean(this._blur)
  }
  set blur(blur) {
    this._blur = blur
    this.trigger('change')
  }

  get image() {
    return rg.toNumber(this._image)
  }
  set image(image) {
    this._image = image
    this.trigger('change')
  }

  get gravity() {
    return this._gravity
  }
  set gravity(gravity) {
    this._gravity = gravity
    this.trigger('change')
  }
}
