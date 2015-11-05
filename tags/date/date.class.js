class RgDate extends RgTag {

  constructor(opts) {
    super()
    if (rg.isUndefined(opts)) opts = {}
    this._isvisible = opts.isvisible
    this._date = opts.date
    this._showYears = opts.showyears
    this._showMonths = opts.showmonths
    this._showToday = opts.showtoday
    this._format = opts.format
    this._yearFormat = opts.yearformat
    this._monthFormat = opts.monthformat
    this._weekFormat = opts.weekformat
    this._dayFormat = opts.dayformat
    this._onclose = opts.onclose
    this._onselect = opts.onselect
    this._onopen = opts.onopen

    const temp = moment()
    this.dayNames = [
      temp.day(0).format(this.weekFormat),
      temp.day(1).format(this.weekFormat),
      temp.day(2).format(this.weekFormat),
      temp.day(3).format(this.weekFormat),
      temp.day(4).format(this.weekFormat),
      temp.day(5).format(this.weekFormat),
      temp.day(6).format(this.weekFormat),
    ]
  }

  _toMoment(date) {
    if (!moment.isMoment(date)) date = moment(date)
    if (date.isValid()) return date
    return moment()
  }

  get date() {
    return this._toMoment(this._date)
  }
  set date(date) {
    this._date = date
    if (rg.isFunction(this._onselect)) this._onselect(this.date)
    this._isvisible = false
  }

  get dateFormatted() {
    return this.date.format(this.format)
  }

  get isvisible() {
    return rg.toBoolean(this._isvisible)
  }

  get year() {
    return this.date.format(this.yearFormat)
  }

  get month() {
    return this.date.format(this.monthFormat)
  }

  get day() {
    return this.date.format(this.dayFormat)
  }

  get showYears() {
    if (rg.isUndefined(this._showYears)) return true
    return rg.toBoolean(this._showYears)
  }
  set showYears(show) {
    this._showYears = rg.toBoolean(show)
  }

  get showMonths() {
    if (rg.isUndefined(this._showMonths)) return true
    return rg.toBoolean(this._showMonths)
  }
  set showMonths(show) {
    this._showMonths = rg.toBoolean(show)
  }

  get showToday() {
    if (rg.isUndefined(this._showToday)) return true
    return rg.toBoolean(this._showToday)
  }
  set showToday(show) {
    this._showToday = rg.toBoolean(show)
  }

  get format() {
    return this._format || 'LL'
  }
  set format(format) {
    this._format = format
  }

  get yearFormat() {
    return this._yearFormat || 'YYYY'
  }
  set yearFormat(yearFormat) {
    this._yearFormat = yearFormat
  }

  get monthFormat() {
    return this._monthFormat || 'MMMM'
  }
  set monthFormat(monthFormat) {
    this._monthFormat = monthFormat
  }

  get weekFormat() {
    return this._weekFormat || 'ddd'
  }
  set weekFormat(weekFormat) {
    this._weekFormat = weekFormat
  }

  get dayFormat() {
    return this._dayFormat || 'DD'
  }
  set dayFormat(dayFormat) {
    this._dayFormat = dayFormat
  }

  open() {
    this._isvisible = true
    if (rg.isFunction(this._onopen)) this._onopen()
  }

  close() {
    if (this.isvisible) {
      this._isvisible = false
      if (rg.isFunction(this._onclose)) this._onclose()
    }
  }

  setToday() {
    this.select(moment())
  }

  prevYear() {
    this._date = this.date.subtract(1, 'year')
  }

  nextYear() {
    this._date = this.date.add(1, 'year')
  }

  prevMonth() {
    this._date = this.date.subtract(1, 'month')
  }

  nextMonth() {
    this._date = this.date.add(1, 'month')
  }

  select(date) {
    this._date = date
    if (rg.isFunction(this._onselect)) this._onselect(this.date)
  }
}
