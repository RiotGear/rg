<rg-date>
	<div class="container { open: opened }">
		<input type="text" class="field" onclick="{ show }" value="{ date.format(this.format) }" readonly />

		<div class="calendar" show="{ opened }">
			<div class="grid grid-row" if="{ opts.years != 'false' }">
				<div class="selector" onclick="{ prevYear }">&lsaquo;</div>
				<span class="year">{ date.format(this.yearFormat) }</span>
				<div class="selector" onclick="{ nextYear }">&rsaquo;</div>
			</div>
			<div class="grid grid-row" if="{ opts.years == 'false' }">
				<span class="year fill">{ date.format(this.yearFormat) }</span>
			</div>

			<div class="grid grid-row" if="{ opts.months != 'false' }">
				<div class="selector" onclick="{ prevMonth }">&lsaquo;</div>
				<span class="month">{ date.format(this.monthFormat) }</span>
				<div class="selector" onclick="{ nextMonth }">&rsaquo;</div>
			</div>
			<div class="grid grid-row" if="{ opts.months == 'false' }">
				<span class="month fill">{ date.format(this.monthFormat) }</span>
			</div>

			<div class="grid grid-row">
				<span class="day-name" each="{ day in dayNames }">{ day }</span>
			</div>
			<div class="grid grid-wrap">
				<div each="{ day in startBuffer }" onclick="{ changeDate }" class="date {
							in: day.inMonth,
							selected: day.selected,
							today: day.today
						}">
					{ day.date.format(this.dayFormat) }
				</div>
				<div each="{ day in days }" onclick="{ changeDate }" class="date {
							in: day.inMonth,
							selected: day.selected,
							today: day.today
						}">
					{ day.date.format(this.dayFormat) }
				</div>
				<div each="{ day in endBuffer }" onclick="{ changeDate }" class="date {
							in: day.inMonth,
							selected: day.selected,
							today: day.today
						}">
					{ day.date.format(this.dayFormat) }
				</div>
			</div>
			<div if="{ showToday }" class="grid grid-row">
				<a class="shortcut" onclick="{ setToday }">Today</a>
			</div>
		</div>
	</div>

	<script>
		this.months = rg.toBoolean(opts.months)
		this.years = rg.toBoolean(opts.years)

		// Set today shortcut boolean
		this.showToday = rg.isDefined(opts.today) ? rg.toBoolean(opts.today) : true

		// Get our display formats
		this.format = opts.format || 'LL'
		this.yearFormat = opts['year-format'] || 'YYYY'
		this.monthFormat = opts['month-format'] || 'MMMM'
		this.weekFormat = opts['week-format'] || 'ddd'
		this.dayFormat = opts['day-format'] || 'DD'

		// Convert the given date to a moment object
		this.date = moment(rg.isDate(opts.date) || new Date())

		// Setup the weekday list
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

		const handleClickOutside = e => {
			if (!this.root.contains(e.target) && this.opened) {
				if (rg.isFunction(opts.onclose)) opts.onclose(this.date)
				this.opened = false
				this.update()
			}
		}

		const dayObj = dayDate => {
			const dateObj = dayDate || moment()

			return {
				date: dateObj,
				selected: this.date.isSame(dayDate, 'day'),
				today: moment().isSame(dayDate, 'day'),
				inMonth: this.date.isSame(dayDate, 'month'),
			}
		}

		const buildCalendar = () => {
			const begin = moment(this.date).startOf('month')
			const end = moment(this.date).endOf('month')

			this.days = []
			this.startBuffer = []
			this.endBuffer = []

			for (let i = begin.weekday(); i >= 0; i -= 1) {
				const bufferDate = moment(begin).subtract(i, 'days')
				this.startBuffer.push(dayObj(bufferDate))
			}

			for (let i = end.date() - 1; i > 0; i -= 1) {
				const current = moment(begin).add(i, 'days')
				this.days.unshift(dayObj(current))
			}

			for (let i = end.weekday(); i < 6; i += 1) {
				const bufferDate = moment(end).add(i, 'days')
				this.endBuffer.push(dayObj(bufferDate))
			}

			this.opts.date = this.date.toDate()
			this.update()
		}

		this.on('mount', () => {
			document.addEventListener('click', handleClickOutside)
		})

		this.on('unmount', () => {
			document.removeEventListener('click', handleClickOutside)
		})

		// Handle the clicks on dates
		this.changeDate = (e) => {
			const day = e.item.day
			this.date = day.date
			if (rg.isFunction(opts.onselect)) opts.onselect(this.date)
			buildCalendar()
			this.opened = false
		}

		// Handle today shortcut
		this.setToday = () => {
			this.date = opts.date = moment()
			buildCalendar()
			this.opened = false
		}

		// Handle the previous year change
		this.prevYear = () => {
			this.date.subtract(1, 'year').startOf('month')
			buildCalendar()
		}

		// Handle the next month change
		this.nextYear = () => {
			this.date.add(1, 'year').startOf('month')
			buildCalendar()
		}

		// Handle the previous month change
		this.prevMonth = () => {
			this.date.subtract(1, 'month').startOf('month')
			buildCalendar()
		}

		// Handle the next month change
		this.nextMonth = () => {
			this.date.add(1, 'month').startOf('month')
			buildCalendar()
		}

		// Show/hide the datepicker
		this.show = () => {
			if (rg.isFunction(opts.onopen)) opts.onopen()
			buildCalendar()
			this.opened = true
		}
	</script>

	<style scoped>
		.container {
			position: relative;
			display: inline-block;
			cursor: pointer;
		}

		.field {
			font-size: 1em;
			padding: 10px;
			border: 1px solid #D3D3D3;
			cursor: pointer;
			box-sizing: border-box;
			outline: none;
		}

		.calendar {
			position: absolute;
			text-align: center;
			background-color: white;
			border: 1px solid #D3D3D3;
			padding: 5px;
			width: 330px;
			margin-top: 10px;
			left: 50%;
			-webkit-transform: translateX(-50%);
			-moz-transform: translateX(-50%);
			-ms-transform: translateX(-50%);
			-o-transform: translateX(-50%);
			transform: translateX(-50%);
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			box-sizing: border-box;
			z-index: 1;
		}

		.grid {
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
		}

		.grid-wrap {
			width: 100%;
			-webkit-flex-wrap: wrap;
			-ms-flex-wrap: wrap;
			flex-wrap: wrap;
		}

		.grid-row {
			height: 35px;
		}

		.selector {
			font-size: 2em;
			font-weight: 100;
			padding: 0;
			-webkit-flex: 0 0 15%;
			-ms-flex: 0 0 15%;
			flex: 0 0 15%;
		}

		.year,
		.month {
			text-transform: uppercase;
			font-weight: normal;
			-webkit-flex: 0 0 70%;
			-ms-flex: 0 0 70%;
			flex: 0 0 70%;
		}

		.fill {
			-webkit-flex: 0 0 100%;
			-ms-flex: 0 0 100%;
			flex: 0 0 100%;
		}

		.day-name {
			font-weight: bold;
			-webkit-flex: 0 0 14.28%;
			-ms-flex: 0 0 14.28%;
			flex: 0 0 14.28%;
		}

		.date {
			-webkit-flex: 0 0 14.28%;
			-ms-flex: 0 0 14.28%;
			flex: 0 0 14.28%;
			padding: 12px 10px;
			box-sizing: border-box;
			font-size: 0.8em;
			font-weight: normal;
			border: 1px solid transparent;
			color: #cacaca;
		}

		.date:hover {
			background-color: #f3f3f3;
		}

		.date.in {
			color: inherit;
		}

		.today {
			border-color: #ededed;
		}

		.selected,
		.selected:hover {
			background-color: #ededed;
			border-color: #dedede;
		}

		.shortcut {
			-webkit-flex: 0 0 100%;
			-ms-flex: 0 0 100%;
			flex: 0 0 100%;
			color: #6495ed;
		}
	</style>

</rg-date>
