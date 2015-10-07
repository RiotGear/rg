class RgCreditCard {

  constructor(opts) {
    riot.observable(this)
    if (rg.isUndefined(opts)) opts = {}
    this._placeholder = opts.placeholder
    this._cardnumber = opts.cardnumber
  }

  validate() {
    const res = rg.creditcard.validate(this.cardnumber)
    this.valid = res.valid
    this.icon = this.valid ? res.card_type.name : ''
    this.trigger('validate')
  }

  get cardnumber() {
    return (this._cardnumber || '').toString()
  }
  set cardnumber(num) {
    this._cardnumber = num
    this.trigger('change')
  }

  get valid() {
    return rg.toBoolean(this._valid)
  }
  set valid(valid) {
    this._valid = rg.toBoolean(valid)
  }

  get placeholder() {
    return this._placeholder || 'Card no.'
  }
  set placeholder(text) {
    this._placeholder = text
  }
}
