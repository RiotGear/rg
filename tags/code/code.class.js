class RgCode extends RgTag {

  constructor(opts) {
    super()
    if (rg.isUndefined(opts)) opts = {}
    this._url = opts.url
    this._code = opts.code
    this._onchange = opts.onchange
    this._theme = opts.theme
    this._mode = opts.mode
    this._tabsize = opts.tabsize
    this._softtabs = opts.softtabs
    this._wordwrap = opts.wordwrap
    this._readonly = opts.readonly
  }

  get url() {
    return this._url
  }
  set url(url) {
    this._url = url
  }

  get code() {
    return this._code || ''
  }
  set code(code) {
    this._code = code
  }

  get onchange() {
    if (rg.isFunction(this._onchange)) return this._onchange
    return null
  }
  set onchange(onchange) {
    if (rg.isFunction(onchange)) this._onchange = onchange
  }

  get theme() {
    return this._theme || 'monokai'
  }
  set theme(theme) {
    this._theme = theme
  }

  get mode() {
    return this._mode || 'html'
  }
  set mode(mode) {
    this._mode = mode
  }

  get tabsize() {
    return rg.toNumber(this._tabsize) || 2
  }
  set tabsize(tabsize) {
    this._tabsize = tabsize
  }

  get softtabs() {
    return rg.toBoolean(this._softtabs)
  }
  set softtabs(softtabs) {
    this._softtabs = softtabs
  }

  get wordwrap() {
    return rg.toBoolean(this._wordwrap)
  }
  set wordwrap(wordwrap) {
    this._wordwrap = wordwrap
  }

  get readonly() {
    return rg.toBoolean(this._readonly)
  }
  set readonly(readonly) {
    this._readonly = readonly
  }
}
