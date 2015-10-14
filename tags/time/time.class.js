class RgTime extends RgSelect {

  constructor(opts) {
    super(opts)
    this._min = opts.min
    this._max = opts.max
    this._time = opts.time
    this._step = opts.step
    this._ampm = opts.ampm
  }

  get min() {
    if (this._min) return this._min.split(':')
    return this._min
  }
  set min(min) {
    this._min = min
    this.trigger('change')
  }

  get max() {
    if (this._max) return this._max.split(':')
    return this._max
  }
  set max(max) {
    this._max = max
    this.trigger('change')
  }

  get time() {
    if (rg.isDate(this._time)) return this._time
    return new Date()
  }
  set time(time) {
    this._time = time
    this.trigger('change')
  }

  get step() {
    return rg.toNumber(this._step) || 1
  }
  set step(step) {
    this._step = step
    this.trigger('change')
  }

  get ampm() {
    return rg.toBoolean(this._ampm)
  }
  set ampm(ampm) {
    this._ampm = ampm
    this.trigger('change')
  }
}
