riot.tag2('rg-date', '<div class="o-container"> <input type="text" class="c-field" onclick="{open}" value="{opts.date.date.format(format)}" readonly> <div class="c-calendar c-calendar--high" if="{opts.date.isvisible}"> <button class="c-calendar__control" __disabled="{opts.date.min.isSame(opts.date.date, \'year\')}" onclick="{prevYear}">‹</button> <div class="c-calendar__header">{opts.date.date.format(yearFormat)}</div> <button class="c-calendar__control" __disabled="{opts.date.max.isSame(opts.date.date, \'year\')}" onclick="{nextYear}">›</button> <button class="c-calendar__control" __disabled="{opts.date.min.isSame(opts.date.date, \'month\')}" onclick="{prevMonth}">‹</button> <div class="c-calendar__header">{opts.date.date.format(monthFormat)}</div> <button class="c-calendar__control" __disabled="{opts.date.max.isSame(opts.date.date, \'month\')}" onclick="{nextMonth}">›</button> <div class="c-calendar__day">Mo</div> <div class="c-calendar__day">Tu</div> <div class="c-calendar__day">We</div> <div class="c-calendar__day">Th</div> <div class="c-calendar__day">Fr</div> <div class="c-calendar__day">Sa</div> <div class="c-calendar__day">Su</div> <button class="c-calendar__date {\'c-calendar__date--selected\': day.selected, \'c-calendar__date--today\': day.today}" __disabled="{day.disabled}" each="{day in startBuffer}" onclick="{select}">{day.date.format(dayFormat)}</button> <button class="c-calendar__date c-calendar__date--in-month {\'c-calendar__date--selected\': day.selected, \'calendar__date--today\': day.today}" __disabled="{day.disabled}" each="{day in days}" onclick="{select}">{day.date.format(dayFormat)}</button> <button class="c-calendar__date {\'c-calendar__date--selected\': day.selected, \'c-calendar__date--today\': day.today}" __disabled="{day.disabled}" each="{day in endBuffer}" onclick="{select}">{day.date.format(dayFormat)}</button> <button class="c-button c-button--block c-button--primary" __disabled="{opts.date.min.isAfter(moment(), \'day\') || opts.date.max.isBefore(moment(), \'day\')}" onclick="{setToday}">Today</button> </div> </div>', 'rg-date .o-container,[riot-tag="rg-date"] .o-container,[data-is="rg-date"] .o-container{ position: relative; display: inline-block; cursor: pointer; } rg-date .c-calendar,[riot-tag="rg-date"] .c-calendar,[data-is="rg-date"] .c-calendar{ position: absolute; min-width: 300px; margin-top: .5em; left: 0; }', '', function(opts) {
var _this = this;

var toMoment = function toMoment(d) {
	if (!moment.isMoment(d)) d = moment(d);
	if (d.isValid()) return d;
	return moment();
};

var handleClickOutside = function handleClickOutside(e) {
	if (!_this.root.contains(e.target)) _this.close();
	_this.update();
};

var dayObj = function dayObj(dayDate) {
	var dateObj = dayDate || moment();

	return {
		date: dateObj,
		selected: opts.date.date.isSame(dayDate, 'day'),
		today: moment().isSame(dayDate, 'day'),
		disabled: opts.date.min && opts.date.min.isAfter(dayDate) || opts.date.max && opts.date.max.isBefore(dayDate)
	};
};

var buildCalendar = function buildCalendar() {
	_this.format = 'LL';
	_this.yearFormat = 'YYYY';
	_this.monthFormat = 'MMMM';
	_this.dayFormat = 'DD';

	_this.days = [];
	_this.startBuffer = [];
	_this.endBuffer = [];

	var begin = moment(opts.date.date).startOf('month');
	var daysInMonth = moment(opts.date.date).daysInMonth();
	var end = moment(opts.date.date).endOf('month');

	for (var i = begin.isoWeekday() - 1; i > 0; i -= 1) {
		var d = moment(begin).subtract(i, 'days');
		_this.startBuffer.push(dayObj(d));
	}

	for (var i = 0; i < daysInMonth; i++) {
		var current = moment(begin).add(i, 'days');
		_this.days.push(dayObj(current));
	}

	for (var i = end.isoWeekday() + 1; i <= 7; i++) {
		var d = moment(end).add(i - end.isoWeekday(), 'days');
		_this.endBuffer.push(dayObj(d));
	}
};

this.on('mount', function () {
	if (!opts.date) opts.date = { date: moment() };
	if (!opts.date.date) opts.date.date = moment();
	opts.date.date = toMoment(opts.date.date);

	if (opts.date.min) {
		opts.date.min = toMoment(opts.date.min);

		if (opts.date.min.isAfter(moment(), 'day')) {
			opts.date.date = moment(opts.date.min);
		}
	}

	if (opts.date.max) {
		opts.date.max = toMoment(opts.date.max);

		if (opts.date.max.isBefore(moment(), 'day')) {
			opts.date.date = moment(opts.date.max);
		}
	}

	_this.on('update', function () {
		opts.date.date = toMoment(opts.date.date);
		buildCalendar();
		positionDropdown();
	});
	document.addEventListener('click', handleClickOutside);
	_this.update();
});

this.on('unmount', function () {
	document.removeEventListener('click', handleClickOutside);
});

this.open = function () {
	opts.date.isvisible = true;
	_this.trigger('open');
};

this.close = function () {
	if (opts.date.isvisible) {
		opts.date.isvisible = false;
		_this.trigger('close');
	}
};

this.select = function (e) {
	opts.date.date = e.item.day.date;
	_this.trigger('select', opts.date.date);
};

this.setToday = function () {
	opts.date.date = moment();
	_this.trigger('select', opts.date.date);
};

this.prevYear = function () {
	opts.date.date = opts.date.date.subtract(1, 'year');
};

this.nextYear = function () {
	opts.date.date = opts.date.date.add(1, 'year');
};

this.prevMonth = function () {
	opts.date.date = opts.date.date.subtract(1, 'month');
};

this.nextMonth = function () {
	opts.date.date = opts.date.date.add(1, 'month');
};

function getWindowDimensions() {
	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = w.innerWidth || e.clientWidth || g.clientWidth,
	    y = w.innerHeight || e.clientHeight || g.clientHeight;
	return { width: x, height: y };
}

var positionDropdown = function positionDropdown() {
	var w = getWindowDimensions();
	var m = _this.root.querySelector('.calendar');
	if (!m) return;
	if (!opts.date.isvisible) {
		m.style.marginTop = '';
		m.style.marginLeft = '';
		return;
	}
	var pos = m.getBoundingClientRect();
	if (w.width < pos.left + pos.width) {
		m.style.marginLeft = w.width - (pos.left + pos.width) - 20 + 'px';
	}
	if (pos.left < 0) {
		m.style.marginLeft = '20px';
	}
	if (w.height < pos.top + pos.height) {
		m.style.marginTop = w.height - (pos.top + pos.height) - 20 + 'px';
	}
};
});
