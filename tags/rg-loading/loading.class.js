class RgLoading {

	constructor(opts) {
		riot.observable(this)
		if (!opts) opts = {}
		this._isvisible = opts.isvisible
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
}
