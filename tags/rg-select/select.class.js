;(() => {
	window.rg = window.rg || {}
	rg.Select = class RgSelect {

		constructor(opts) {
			riot.observable(this)
			if (!opts) opts = {}
			this._isvisible = opts.isvisible
			this._autocomplete = opts.autocomplete
			this._filteron = opts.filteron
			this._options = opts.options
			this._hasfilter = opts.hasfilter
			this._placeholder = opts.placeholder
			this._filterplaceholder = opts.filterplaceholder
			this._filtereditems = opts.filtereditems
		}

		update() {
			this.trigger('update')
		}

		get isvisible() {
			return (this._isvisible == 'true' || this._isvisible === true)
		}

		set isvisible(isvisible) {
			this._isvisible = isvisible
		}

		get autocomplete() {
			return (this._autocomplete == 'true' || this._autocomplete === true)
		}

		set autocomplete(autocomplete) {
			this._autocomplete = autocomplete

		}

		get filteron() {
			return this._filteron || 'text'
		}

		set filteron(filteron) {
			this._filteron = filteron
		}

		get placeholder() {
			return this._placeholder
		}

		set placeholder(placeholder) {
			this._placeholder = placeholder
		}

		get filterplaceholder() {
			return this._filterplaceholder
		}

		set filterplaceholder(filterplaceholder) {
			this._filterplaceholder = filterplaceholder
		}

		get hasfilter() {
			return (this._hasfilter == 'true' || this._hasfilter === true)
		}

		set hasfilter(hasfilter) {
			this._hasfilter = hasfilter
		}

		get options() {
			if (Array.isArray(this._options)) return this._options
			this._options = []
			return this._options
		}

		set options(options) {
			if (!Array.isArray(options)) options = []
			options.forEach((item, i) => {
				item.id = item.id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36)
				if (item.selected) this.select(item)
			})
			this._options = options
		}

		get filtereditems() {
			if (Array.isArray(this._filtereditems)) return this._filtereditems
			this._filtereditems = []
			return this._filtereditems
		}

		set filtereditems(filtereditems) {
			this._filtereditems = filtereditems
		}

		open() {
			if (!this.isvisible) this.trigger('open')
			this.isvisible = true
		}

		close() {
			if (this.isvisible) this.trigger('close')
			this.isvisible = false
		}

		toggle() {
			this.isvisible = !this.isvisible
			if (this.isvisible) this.trigger('open')
			else if (!this.isvisible) this.trigger('close')
		}

		filter(text) {
			this.filtereditems = this.options.filter(item => {
				item.active = false
				const f = item[this.filteron]
				if (typeof f === 'undefined') return false
				if (text.length == 0 ||
					f.toString()
						.toLowerCase()
						.indexOf(text.toString().toLowerCase()) > -1)
					return true
			})
			this.trigger('filter', text)
		}

		select(item) {
			this.options.forEach(i => i.selected = false)
			item.selected = true
			this.isvisible = false
			if (this.autocomplete) this.filter(item[this.filteron])
			this.trigger('select', item)
		}
	}
})()
