class RgContextMenu {

	constructor(opts) {
		riot.observable(this)
		if (!opts) opts = {}
		this.name = opts.name
		this._isvisible = opts.isvisible
		this._items = opts.items
	}

	update() {
		this.trigger('update')
	}

	get items() {
		if (Array.isArray(this._items)) return this._items
		this._items = []
		return this._items
	}

	set items(items) {
		this._items = items
	}

	get isvisible() {
		return (this._isvisible == 'true' || this._isvisible === true)
	}

	set isvisible(isvisible) {
		this._isvisible = (isvisible == 'true' || isvisible === true)
	}

	open() {
		this.trigger('open')
		this.isvisible = true
	}

	close() {
		this.trigger('close')
		this.isvisible = false
	}

	select(item) {
		if (!item.inactive) {
			this.trigger('select', item)
			this.isvisible = false
		}
	}
}
