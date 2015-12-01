class RgDrawer {

	constructor(opts) {
		riot.observable(this)
		if (!opts) opts = {}
		this._isvisible = opts.isvisible
		this._header = opts.header
		this._items = opts.items
		this._position = opts.position
	}

	update() {
		this.trigger('update')
	}

	get isvisible() {
		return (this._isvisible == 'true' || this._isvisible === true)
	}

	set isvisible(isvisible) {
		this._isvisible = (isvisible == 'true' || isvisible === true)
	}

	get header() {
		return this._header
	}

	set header(header) {
		this._header = header
	}

	get items() {
		if (Array.isArray(this._items)) return this._items
		this._items = []
		return this._items
	}

	set items(items) {
		this._items = items
	}

	get position() {
		return this._position || 'bottom'
	}

	set position(position) {
		this._position = position
	}

	open() {
		this.trigger('open')
		this.isvisible = true
	}

	close() {
		this.trigger('close')
		this.isvisible = false
	}

	toggle() {
		this.isvisible = !this.isvisible
		if (this.isvisible) this.trigger('open')
		else if (!this.isvisible) this.trigger('close')
	}

	select(item) {
		this.items.forEach(item => item.active = false)
		item.active = true
		this.trigger('select', item)
	}
}
