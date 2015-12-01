class RgToggle {

	constructor(opts) {
		riot.observable(this)
		if (!opts) opts = {}
		this._checked = opts.checked
	}

	update() {
		this.trigger('update')
	}

	get checked() {
		return (this._checked == 'true' || this._checked === true)
	}

	set checked(checked) {
		this._checked = checked
	}

	toggle() {
		this.checked = !this.checked
		this.trigger('toggle', this.checked)
	}
}
