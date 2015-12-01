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
  }

  get max() {
    if (this._max) return this._max.split(':')
    return this._max
  }
  set max(max) {
    this._max = max
  }

  get time() {
    if (toString.call(this._time) === '[object Date]') return this._time
    return new Date()
  }
  set time(time) {
    this._time = time
  }

  get step() {
    return this._step || 1
  }
  set step(step) {
    this._step = step
  }

  get ampm() {
    return (this._ampm == 'true' || this._ampm === true)
  }
  set ampm(ampm) {
    this._ampm = ampm
  }
}
