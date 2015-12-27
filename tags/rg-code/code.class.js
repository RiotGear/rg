;(() => {
	window.rg = window.rg || {}
	rg.Code = class RgCode {

		constructor(opts) {
			riot.observable(this)
			if (!opts) opts = {}
			this._url = opts.url
			this._code = opts.code
			this._theme = opts.theme
			this._mode = opts.mode
			this._tabsize = opts.tabsize
			this._softtabs = opts.softtabs
			this._wordwrap = opts.wordwrap
			this._readonly = opts.readonly
		}

		update() {
			this.trigger('update')
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
			this.trigger('change', code)
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
			return this._tabsize || 2
		}

		set tabsize(tabsize) {
			this._tabsize = tabsize
		}

		get softtabs() {
			return (this._softtabs == 'true' || this._softtabs === true)
		}

		set softtabs(softtabs) {
			this._softtabs = softtabs
		}

		get wordwrap() {
			return (this._wordwrap == 'true' || this._wordwrap === true)
		}

		set wordwrap(wordwrap) {
			this._wordwrap = wordwrap
		}

		get readonly() {
			return (this._readonly == 'true' || this._readonly === true)
		}

		set readonly(readonly) {
			this._readonly = readonly
		}
	}
})()