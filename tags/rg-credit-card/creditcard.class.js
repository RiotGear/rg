class RgCreditCard {

	constructor(opts) {
		riot.observable(this)
		if (!opts) opts = {}
		this._placeholder = opts.placeholder
		this._cardnumber = opts.cardnumber
	}

	update() {
		this.trigger('update')
	}

	validate() {
		const res = rg.creditcard.validate(this.cardnumber)
		this.valid = res.valid
		this.icon = this.valid ? res.card_type.name : ''
		this.trigger('validate', this.valid)
	}

	get cardnumber() {
		return (this._cardnumber || '').toString()
	}

	set cardnumber(num) {
		this._cardnumber = num
	}

	get valid() {
		return (this._valid == 'true' || this._valid === true)
	}

	set valid(valid) {
		this._valid = (valid == 'true' || valid === true)
	}

	get placeholder() {
		return this._placeholder || 'Card no.'
	}

	set placeholder(text) {
		this._placeholder = text
	}
}
