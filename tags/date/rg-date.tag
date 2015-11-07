<rg-date>
	<div class="container { open: RgDate.isvisible }">
		<input type="text" class="field" onclick="{ open }" value="{ RgDate.dateFormatted }" readonly />

		<div class="calendar" show="{ RgDate.isvisible }">
			<div class="grid grid-row" if="{ RgDate.showYears }">
				<div class="selector" onclick="{ prevYear }">&lsaquo;</div>
				<span class="year">{ RgDate.year }</span>
				<div class="selector" onclick="{ nextYear }">&rsaquo;</div>
			</div>
			<div class="grid grid-row" if="{ !RgDate.showYears }">
				<span class="year fill">{ RgDate.year }</span>
			</div>

			<div class="grid grid-row" if="{ RgDate.showMonths }">
				<div class="selector" onclick="{ prevMonth }">&lsaquo;</div>
				<span class="month">{ RgDate.month }</span>
				<div class="selector" onclick="{ nextMonth }">&rsaquo;</div>
			</div>
			<div class="grid grid-row" if="{ !RgDate.showMonths }">
				<span class="month fill">{ RgDate.month }</span>
			</div>

			<div class="grid grid-row">
				<span class="day-name" each="{ day in RgDate.dayNames }">{ day }</span>
			</div>
			<div class="grid grid-wrap">
				<div each="{ day in startBuffer }" onclick="{ select }" class="date { in: day.inMonth, selected: day.selected, today: day.today }">
					{ day.date.format(this.RgDate.dayFormat) }
				</div>
				<div each="{ day in days }" onclick="{ select }" class="date { in: day.inMonth, selected: day.selected, today: day.today }">
					{ day.date.format(this.RgDate.dayFormat) }
				</div>
				<div each="{ day in endBuffer }" onclick="{ select }" class="date { in: day.inMonth, selected: day.selected, today: day.today }">
					{ day.date.format(this.RgDate.dayFormat) }
				</div>
			</div>
			<div if="{ RgDate.showToday }" class="grid grid-row">
				<a class="shortcut" onclick="{ setToday }">Today</a>
			</div>
		</div>
	</div>

	<script>
		const handleClickOutside = e => {
			if (!this.root.contains(e.target)) this.RgDate.close()
			this.update()
		}

		const dayObj = dayDate => {
			const dateObj = dayDate || moment()

			return {
				date: dateObj,
				selected: this.RgDate.date.isSame(dayDate, 'day'),
				today: moment().isSame(dayDate, 'day'),
				inMonth: this.RgDate.date.isSame(dayDate, 'month'),
			}
		}

		const buildCalendar = () => {
			const begin = moment(this.RgDate.date).startOf('month')
			const end = moment(this.RgDate.date).endOf('month')

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
		}

		this.on('mount', () => {
			this.RgDate = opts.date || new RgDate(opts)
			this.RgDate.on('update', () => {
				this.update()
			})
			this.on('update', () => {
				buildCalendar()
			})
			document.addEventListener('click', handleClickOutside)
			this.update()
		})

		this.on('unmount', () => {
			document.removeEventListener('click', handleClickOutside)
		})

		this.open = () => {
			this.RgDate.open()
		}

		this.prevYear = () => {
			this.RgDate.prevYear()
		}

		this.nextYear = () => {
			this.RgDate.nextYear()
		}

		this.prevMonth = () => {
			this.RgDate.prevMonth()
		}

		this.nextMonth = () => {
			this.RgDate.nextMonth()
		}

		this.setToday = () => {
			this.RgDate.setToday()
		}

		this.select = e => {
			this.RgDate.select(e.item.day.date)
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
			transform: translate3d(-50%, 0, 0);
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
