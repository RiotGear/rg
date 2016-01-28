;(() => {
	window.rg = window.rg || {}
	rg.Date = class RgDate {

		constructor(opts) {
			riot.observable(this)
			if (!opts) opts = {}
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

		update() {
			this.trigger('update')
		}

		get date() {
			return this._toMoment(this._date)
		}

		set date(date) {
			this._date = date
			this._isvisible = false
			this.trigger('select', this.date)
		}

		get dateFormatted() {
			return this.date.format(this.format)
		}

		get isvisible() {
			return (this._isvisible == 'true' || this._isvisible === true)
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
			if (typeof this._showYears === 'undefined') return true
			return (this._showYears == 'true' || this._showYears === true)
		}

		set showYears(show) {
			this._showYears = (show == 'true' || show === true)
		}

		get showMonths() {
			if (typeof this._showMonths === 'undefined') return true
			return (this._showMonths == 'true' || this._showMonths === true)
		}

		set showMonths(show) {
			this._showMonths = (show == 'true' || show === true)
		}

		get showToday() {
			if (typeof this._showToday === 'undefined') return true
			return (this._showToday == 'true' || this._showToday === true)
		}

		set showToday(show) {
			this._showToday = (show == 'true' || show === true)
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
			this.trigger('open')
		}

		close() {
			if (this.isvisible) {
				this._isvisible = false
				this.trigger('close')
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
			this.trigger('select', this.date)
		}
	}
})()
