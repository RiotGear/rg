class RgPlaceholdit {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._width = opts.width
    this._height = opts.height
    this._background = opts.background
    this._color = opts.color
    this._text = opts.text
    this._textsize = opts.textsize
    this._format = opts.format
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

  get background() {
    return this._background || 'f01e52'
  }
  set background(background) {
    this._background = background
    this.trigger('change')
  }

  get color() {
    return this._color || 'fff'
  }
  set color(color) {
    this._color = color
    this.trigger('change')
  }

  get text() {
    return this._text || `${this.width} x ${this.height}`
  }
  set text(text) {
    this._text = text
    this.trigger('change')
  }

  get textsize() {
    return rg.toNumber(this._textsize) || 30
  }
  set textsize(textsize) {
    this._textsize = textsize
    this.trigger('change')
  }

  get format() {
    return this._format || 'png'
  }
  set format(format) {
    this._format = format
    this.trigger('change')
  }
}
