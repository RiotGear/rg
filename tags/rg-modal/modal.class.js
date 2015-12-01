class RgModal {

	constructor(opts) {
		riot.observable(this)
		this._isvisible = opts.isvisible
		this._dismissable = opts.dismissable
		this._ghost = opts.ghost
		this._heading = opts.heading
		this._buttons = opts.buttons
	}

	update() {
		this.trigger('update')
	}

	get dismissable() {
		if (typeof this._dismissable === 'undefined') this._dismissable = true
		return (this._dismissable == 'true' || this._dismissable === true)
	}

	set dismissable(dismissable) {
		this._dismissable = dismissable
	}

	get ghost() {
		return (this._ghost == 'true' || this._ghost === true)
	}

	set ghost(ghost) {
		this._ghost = ghost
	}

	get heading() {
		return this._heading || ''
	}

	set heading(heading) {
		this._heading = heading
	}

	get buttons() {
		if (Array.isArray(this._buttons)) return this._buttons
		return []
	}

	set buttons(buttons) {
		this._buttons = buttons
	}

	get isvisible() {
		return (this._isvisible == 'true' || this._isvisible === true)
	}

	set isvisible(isvisible) {
		this._isvisible = isvisible
		if (this.isvisible) this.trigger('open')
		if (!this.isvisible) this.trigger('close')
	}
}
