riot.tag2('rg-date', '<div class="container"> <input type="text" class="field" onclick="{open}" riot-value="{value}" readonly> <div class="calendar calendar--high" if="{isvisible}"> <button class="calendar__control" disabled="{opts.date.min.isSame(opts.date.date, \'year\')}" onclick="{prevYear}">‹</button> <div class="calendar__header">{opts.date.date.format(yearFormat)}</div> <button class="calendar__control" disabled="{opts.date.max.isSame(opts.date.date, \'year\')}" onclick="{nextYear}">›</button> <button class="calendar__control" disabled="{opts.date.min.isSame(opts.date.date, \'month\')}" onclick="{prevMonth}">‹</button> <div class="calendar__header">{opts.date.date.format(monthFormat)}</div> <button class="calendar__control" disabled="{opts.date.max.isSame(opts.date.date, \'month\')}" onclick="{nextMonth}">›</button> <div class="calendar__day">Mo</div> <div class="calendar__day">Tu</div> <div class="calendar__day">We</div> <div class="calendar__day">Th</div> <div class="calendar__day">Fr</div> <div class="calendar__day">Sa</div> <div class="calendar__day">Su</div> <button class="calendar__date {\'calendar__date--selected\': day.selected, \'calendar__date--today\': day.today}" disabled="{day.disabled}" each="{day in startBuffer}" onclick="{select}">{day.date.format(dayFormat)}</button> <button class="calendar__date calendar__date--in-month {\'calendar__date--selected\': day.selected, \'calendar__date--today\': day.today}" disabled="{day.disabled}" each="{day in days}" onclick="{select}">{day.date.format(dayFormat)}</button> <button class="calendar__date {\'calendar__date--selected\': day.selected, \'calendar__date--today\': day.today}" disabled="{day.disabled}" each="{day in endBuffer}" onclick="{select}">{day.date.format(dayFormat)}</button> <button class="button button--block button--primary" disabled="{opts.date.min.isAfter(moment(), \'day\') || opts.date.max.isBefore(moment(), \'day\')}" onclick="{setToday}">Today</button> </div> </div>', 'rg-date .container,[data-is="rg-date"] .container{ position: relative; display: inline-block; cursor: pointer; } rg-date .calendar,[data-is="rg-date"] .calendar{ position: absolute; min-width: 300px; margin-top: .5em; left: 0; }', '', function(opts) {
const toMoment = d => {
  if (!moment.isMoment(d)) d = moment(d);
  if (d.isValid()) return d;
  return moment();
};

const handleClickOutside = e => {
  if (!this.root.contains(e.target)) this.close();
  this.update();
};

this.dayObj = dayDate => {
  const dateObj = dayDate || moment();
  return {
    date: dateObj,
    selected: opts.date.date.isSame(dayDate, 'day'),
    today: moment().isSame(dayDate, 'day'),
    disabled: opts.date.min && opts.date.min.isAfter(dayDate) || opts.date.max && opts.date.max.isBefore(dayDate)
  };
};

const buildCalendar = () => {
  this.format = 'LL';
  this.yearFormat = 'YYYY';
  this.monthFormat = 'MMMM';
  this.dayFormat = 'DD';
  this.days = [];
  this.startBuffer = [];
  this.endBuffer = [];
  const begin = moment(opts.date.date).startOf('month');
  const daysInMonth = moment(opts.date.date).daysInMonth();
  const end = moment(opts.date.date).endOf('month');

  for (let i = begin.isoWeekday() - 1; i > 0; i -= 1) {
    const d = moment(begin).subtract(i, 'days');
    this.startBuffer.push(this.dayObj(d));
  }

  for (let i = 0; i < daysInMonth; i++) {
    const current = moment(begin).add(i, 'days');
    this.days.push(this.dayObj(current));
  }

  for (let i = end.isoWeekday() + 1; i <= 7; i++) {
    const d = moment(end).add(i - end.isoWeekday(), 'days');
    this.endBuffer.push(this.dayObj(d));
  }
};

this.on('mount', () => {
  if (!opts.date) opts.date = {
    date: moment()
  };
  if (!opts.date.date) opts.date.date = moment();
  opts.date.date = toMoment(opts.date.date);
  opts.date.min = toMoment(opts.date.min || -8.64e15);

  if (opts.date.min.isAfter(opts.date.date, 'day')) {
    opts.date.date = moment(opts.date.min);
  }

  opts.date.max = toMoment(opts.date.max || 8.64e15);

  if (opts.date.max.isBefore(opts.date.date, 'day')) {
    opts.date.date = moment(opts.date.max);
  }

  document.addEventListener('click', handleClickOutside);
  this.update();
});
this.on('update', () => {
  opts.date.date = toMoment(opts.date.date);
  buildCalendar();
  this.value = opts.date.date.format(this.format);
});
this.on('unmount', () => {
  document.removeEventListener('click', handleClickOutside);
});

this.open = () => {
  this.isvisible = true;
  this.trigger('open');
};

this.close = () => {
  if (this.isvisible) {
    this.isvisible = false;
    this.trigger('close');
  }
};

this.select = e => {
  opts.date.date = e.item.day.date;
  this.trigger('select', opts.date.date);
};

this.setToday = () => {
  opts.date.date = moment();
  this.trigger('select', opts.date.date);
};

this.prevYear = () => {
  opts.date.date = opts.date.date.subtract(1, 'year');
};

this.nextYear = () => {
  opts.date.date = opts.date.date.add(1, 'year');
};

this.prevMonth = () => {
  opts.date.date = opts.date.date.subtract(1, 'month');
};

this.nextMonth = () => {
  opts.date.date = opts.date.date.add(1, 'month');
};
});
