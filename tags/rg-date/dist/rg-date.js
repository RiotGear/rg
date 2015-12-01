'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

riot.tag2('rg-date', '<div class="container {open: RgDate.isvisible}"> <input type="text" class="field" onclick="{open}" value="{RgDate.dateFormatted}" readonly> <div class="calendar" show="{RgDate.isvisible}"> <div class="grid grid-row" if="{RgDate.showYears}"> <div class="selector" onclick="{prevYear}">&lsaquo;</div> <span class="year">{RgDate.year}</span> <div class="selector" onclick="{nextYear}">&rsaquo;</div> </div> <div class="grid grid-row" if="{!RgDate.showYears}"> <span class="year fill">{RgDate.year}</span> </div> <div class="grid grid-row" if="{RgDate.showMonths}"> <div class="selector" onclick="{prevMonth}">&lsaquo;</div> <span class="month">{RgDate.month}</span> <div class="selector" onclick="{nextMonth}">&rsaquo;</div> </div> <div class="grid grid-row" if="{!RgDate.showMonths}"> <span class="month fill">{RgDate.month}</span> </div> <div class="grid grid-row"> <span class="day-name" each="{day in RgDate.dayNames}">{day}</span> </div> <div class="grid grid-wrap"> <div each="{day in startBuffer}" onclick="{select}" class="date {in: day.inMonth, selected: day.selected, today: day.today}"> {day.date.format(this.RgDate.dayFormat)} </div> <div each="{day in days}" onclick="{select}" class="date {in: day.inMonth, selected: day.selected, today: day.today}"> {day.date.format(this.RgDate.dayFormat)} </div> <div each="{day in endBuffer}" onclick="{select}" class="date {in: day.inMonth, selected: day.selected, today: day.today}"> {day.date.format(this.RgDate.dayFormat)} </div> </div> <div if="{RgDate.showToday}" class="grid grid-row"> <a class="shortcut" onclick="{setToday}">Today</a> </div> </div> </div>', 'rg-date .container,[riot-tag="rg-date"] .container { position: relative; display: inline-block; cursor: pointer; } rg-date .field,[riot-tag="rg-date"] .field { font-size: 1em; padding: 10px; border: 1px solid #D3D3D3; cursor: pointer; box-sizing: border-box; outline: none; -webkit-appearance: none; -moz-appearance: none; appearance: none; } rg-date .calendar,[riot-tag="rg-date"] .calendar { position: absolute; text-align: center; background-color: white; border: 1px solid #D3D3D3; padding: 5px; width: 330px; margin-top: 10px; left: 50%; transform: translate3d(-50%, 0, 0); -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; box-sizing: border-box; z-index: 1; } rg-date .grid,[riot-tag="rg-date"] .grid { display: -webkit-flex; display: -ms-flexbox; display: flex; -webkit-align-items: center; -ms-flex-align: center; align-items: center; } rg-date .grid-wrap,[riot-tag="rg-date"] .grid-wrap { width: 100%; -webkit-flex-wrap: wrap; -ms-flex-wrap: wrap; flex-wrap: wrap; } rg-date .grid-row,[riot-tag="rg-date"] .grid-row { height: 35px; } rg-date .selector,[riot-tag="rg-date"] .selector { font-size: 2em; font-weight: 100; padding: 0; -webkit-flex: 0 0 15%; -ms-flex: 0 0 15%; flex: 0 0 15%; } rg-date .year,[riot-tag="rg-date"] .year,rg-date .month,[riot-tag="rg-date"] .month { text-transform: uppercase; font-weight: normal; -webkit-flex: 0 0 70%; -ms-flex: 0 0 70%; flex: 0 0 70%; } rg-date .fill,[riot-tag="rg-date"] .fill { -webkit-flex: 0 0 100%; -ms-flex: 0 0 100%; flex: 0 0 100%; } rg-date .day-name,[riot-tag="rg-date"] .day-name { font-weight: bold; -webkit-flex: 0 0 14.28%; -ms-flex: 0 0 14.28%; flex: 0 0 14.28%; } rg-date .date,[riot-tag="rg-date"] .date { -webkit-flex: 0 0 14.28%; -ms-flex: 0 0 14.28%; flex: 0 0 14.28%; padding: 12px 10px; box-sizing: border-box; font-size: 0.8em; font-weight: normal; border: 1px solid transparent; color: #cacaca; } rg-date .date:hover,[riot-tag="rg-date"] .date:hover { background-color: #f3f3f3; } rg-date .date.in,[riot-tag="rg-date"] .date.in { color: inherit; } rg-date .today,[riot-tag="rg-date"] .today { border-color: #ededed; } rg-date .selected,[riot-tag="rg-date"] .selected,rg-date .selected:hover,[riot-tag="rg-date"] .selected:hover { background-color: #ededed; border-color: #dedede; } rg-date .shortcut,[riot-tag="rg-date"] .shortcut { -webkit-flex: 0 0 100%; -ms-flex: 0 0 100%; flex: 0 0 100%; color: #6495ed; }', '', function (opts) {
	var _this = this;

	var handleClickOutside = function handleClickOutside(e) {
		if (!_this.root.contains(e.target)) _this.RgDate.close();
		_this.update();
	};

	var dayObj = function dayObj(dayDate) {
		var dateObj = dayDate || moment();

		return {
			date: dateObj,
			selected: _this.RgDate.date.isSame(dayDate, 'day'),
			today: moment().isSame(dayDate, 'day'),
			inMonth: _this.RgDate.date.isSame(dayDate, 'month')
		};
	};

	var buildCalendar = function buildCalendar() {
		var begin = moment(_this.RgDate.date).startOf('month');
		var end = moment(_this.RgDate.date).endOf('month');

		_this.days = [];
		_this.startBuffer = [];
		_this.endBuffer = [];

		for (var i = begin.weekday(); i >= 0; i -= 1) {
			var bufferDate = moment(begin).subtract(i, 'days');
			_this.startBuffer.push(dayObj(bufferDate));
		}

		for (var i = end.date() - 1; i > 0; i -= 1) {
			var current = moment(begin).add(i, 'days');
			_this.days.unshift(dayObj(current));
		}

		for (var i = end.weekday(); i < 6; i += 1) {
			var bufferDate = moment(end).add(i, 'days');
			_this.endBuffer.push(dayObj(bufferDate));
		}
	};

	this.on('mount', function () {
		_this.RgDate = opts.date || new RgDate(opts);
		_this.RgDate.on('update', function () {
			_this.update();
		});
		_this.on('update', function () {
			buildCalendar();
		});
		document.addEventListener('click', handleClickOutside);
		_this.update();
	});

	this.on('unmount', function () {
		document.removeEventListener('click', handleClickOutside);
	});

	this.open = function () {
		_this.RgDate.open();
	};

	this.prevYear = function () {
		_this.RgDate.prevYear();
	};

	this.nextYear = function () {
		_this.RgDate.nextYear();
	};

	this.prevMonth = function () {
		_this.RgDate.prevMonth();
	};

	this.nextMonth = function () {
		_this.RgDate.nextMonth();
	};

	this.setToday = function () {
		_this.RgDate.setToday();
	};

	this.select = function (e) {
		_this.RgDate.select(e.item.day.date);
	};
}, '{ }');

var RgDate = (function () {
	function RgDate(opts) {
		_classCallCheck(this, RgDate);

		riot.observable(this);
		if (!opts) opts = {};
		this._isvisible = opts.isvisible;
		this._date = opts.date;
		this._showYears = opts.showyears;
		this._showMonths = opts.showmonths;
		this._showToday = opts.showtoday;
		this._format = opts.format;
		this._yearFormat = opts.yearformat;
		this._monthFormat = opts.monthformat;
		this._weekFormat = opts.weekformat;
		this._dayFormat = opts.dayformat;

		var temp = moment();
		this.dayNames = [temp.day(0).format(this.weekFormat), temp.day(1).format(this.weekFormat), temp.day(2).format(this.weekFormat), temp.day(3).format(this.weekFormat), temp.day(4).format(this.weekFormat), temp.day(5).format(this.weekFormat), temp.day(6).format(this.weekFormat)];
	}

	_createClass(RgDate, [{
		key: '_toMoment',
		value: function _toMoment(date) {
			if (!moment.isMoment(date)) date = moment(date);
			if (date.isValid()) return date;
			return moment();
		}
	}, {
		key: 'update',
		value: function update() {
			this.trigger('update');
		}
	}, {
		key: 'open',
		value: function open() {
			this._isvisible = true;
			this.trigger('open');
		}
	}, {
		key: 'close',
		value: function close() {
			if (this.isvisible) {
				this._isvisible = false;
				this.trigger('close');
			}
		}
	}, {
		key: 'setToday',
		value: function setToday() {
			this.select(moment());
		}
	}, {
		key: 'prevYear',
		value: function prevYear() {
			this._date = this.date.subtract(1, 'year');
		}
	}, {
		key: 'nextYear',
		value: function nextYear() {
			this._date = this.date.add(1, 'year');
		}
	}, {
		key: 'prevMonth',
		value: function prevMonth() {
			this._date = this.date.subtract(1, 'month');
		}
	}, {
		key: 'nextMonth',
		value: function nextMonth() {
			this._date = this.date.add(1, 'month');
		}
	}, {
		key: 'select',
		value: function select(date) {
			this._date = date;
			this.trigger('select', this.date);
		}
	}, {
		key: 'date',
		get: function get() {
			return this._toMoment(this._date);
		},
		set: function set(date) {
			this._date = date;
			this._isvisible = false;
			this.trigger('select', this.date);
		}
	}, {
		key: 'dateFormatted',
		get: function get() {
			return this.date.format(this.format);
		}
	}, {
		key: 'isvisible',
		get: function get() {
			return this._isvisible == 'true' || this._isvisible === true;
		}
	}, {
		key: 'year',
		get: function get() {
			return this.date.format(this.yearFormat);
		}
	}, {
		key: 'month',
		get: function get() {
			return this.date.format(this.monthFormat);
		}
	}, {
		key: 'day',
		get: function get() {
			return this.date.format(this.dayFormat);
		}
	}, {
		key: 'showYears',
		get: function get() {
			if (typeof this._showYears === 'undefined') return true;
			return this._showYears == 'true' || this._showYears === true;
		},
		set: function set(show) {
			this._showYears = show == 'true' || show === true;
		}
	}, {
		key: 'showMonths',
		get: function get() {
			if (typeof this._showMonths === 'undefined') return true;
			return this._showMonths == 'true' || this._showMonths === true;
		},
		set: function set(show) {
			this._showMonths = show == 'true' || show === true;
		}
	}, {
		key: 'showToday',
		get: function get() {
			if (typeof this._showToday === 'undefined') return true;
			return this._showToday == 'true' || this._showToday === true;
		},
		set: function set(show) {
			this._showToday = show == 'true' || show === true;
		}
	}, {
		key: 'format',
		get: function get() {
			return this._format || 'LL';
		},
		set: function set(format) {
			this._format = format;
		}
	}, {
		key: 'yearFormat',
		get: function get() {
			return this._yearFormat || 'YYYY';
		},
		set: function set(yearFormat) {
			this._yearFormat = yearFormat;
		}
	}, {
		key: 'monthFormat',
		get: function get() {
			return this._monthFormat || 'MMMM';
		},
		set: function set(monthFormat) {
			this._monthFormat = monthFormat;
		}
	}, {
		key: 'weekFormat',
		get: function get() {
			return this._weekFormat || 'ddd';
		},
		set: function set(weekFormat) {
			this._weekFormat = weekFormat;
		}
	}, {
		key: 'dayFormat',
		get: function get() {
			return this._dayFormat || 'DD';
		},
		set: function set(dayFormat) {
			this._dayFormat = dayFormat;
		}
	}]);

	return RgDate;
})();