class RgCode {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._src = opts.src
    this._code = opts.code
    this._theme = opts.theme
    this._mode = opts.mode
    this._tabsize = opts.tabsize
    this._softtabs = opts.softtabs
    this._wordwrap = opts.wordwrap
    this._readonly = opts.readonly
  }

  get src() {
    if (this._src) {
      rg.xhr('get', this._src, resp => {

      })
    }
  }
  set src(url) {
    this._src = url
    this.trigger('src')
  }

  get code() {
    return this._code || ''
  }
  set code(code) {
    this._code = code
    this.trigger('change')
  }

  get onchange() {
    if (rg.isFunction(this._onchange)) return this._onchange
    return null
  }
  set onchange(onchange) {
    if (rg.isFunction(onchange)) this._onchange = onchange
    this.trigger('settings')
  }

  get theme() {
    return this._theme || 'monokai'
  }
  set theme(theme) {
    this._theme = theme
    this.trigger('settings')
  }

  get mode() {
    return this._mode || 'html'
  }
  set mode(mode) {
    this._mode = mode
    this.trigger('settings')
  }

  get tabsize() {
    return rg.toNumber(this._tabsize) || 2
  }
  set tabsize(tabsize) {
    this._tabsize = tabsize
    this.trigger('settings')
  }

  get softtabs() {
    return rg.toBoolean(this._softtabs)
  }
  set softtabs(softtabs) {
    this._softtabs = softtabs
    this.trigger('settings')
  }

  get wordwrap() {
    return rg.toBoolean(this._wordwrap)
  }
  set wordwrap(wordwrap) {
    this._wordwrap = wordwrap
    this.trigger('settings')
  }

  get readonly() {
    return rg.toBoolean(this._readonly)
  }
  set readonly(readonly) {
    this._readonly = readonly
    this.trigger('settings')
  }
}
