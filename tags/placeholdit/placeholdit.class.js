class RgPlaceholdit extends RgTag {

  constructor(opts) {
    super()
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
  }

  get height() {
    return rg.toNumber(this._height) || 250
  }
  set height(height) {
    this._height = height
  }

  get background() {
    return this._background || 'f01e52'
  }
  set background(background) {
    this._background = background
  }

  get color() {
    return this._color || 'fff'
  }
  set color(color) {
    this._color = color
  }

  get text() {
    return this._text || `${this.width} x ${this.height}`
  }
  set text(text) {
    this._text = text
  }

  get textsize() {
    return rg.toNumber(this._textsize) || 30
  }
  set textsize(textsize) {
    this._textsize = textsize
  }

  get format() {
    return this._format || 'png'
  }
  set format(format) {
    this._format = format
  }
}
