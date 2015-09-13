<rg-timepicker>

	<rg-select placeholder="Select a time"
						 filter-placeholder="Filter times"
						 options={ times }
						 onopen={ opts.onopen }
						 onclose={ opts.onclose }
						 onselect={ opts.onselect }>
	</rg-select>

	<script>
		opts.time = opts.time || 'now'
		if (opts.time == 'now') opts.time = new Date()
		if (opts.min) opts.min = opts.min.split(':')
		if (opts.max) opts.max = opts.max.split(':')
		var step = parseInt(opts.step) || 1
		this.times = []

		for (var i = 0; i < 1440; i++) {
			if (i % step == 0) {
				var d = new Date(0)
				d.setHours(opts.time.getHours())
				d.setMinutes(opts.time.getMinutes())
				d = new Date(d.getTime() + i * 60000)
				// Check min range
				if (opts.min) {
					if (d.getHours() < opts.min[0]) continue
					if (d.getHours() == opts.min[0] && d.getMinutes() < opts.min[1]) continue
				}
				// Check max range
				if (opts.max) {
					if (d.getHours() > opts.max[0]) continue
					if (d.getHours() == opts.max[0] && d.getMinutes() > opts.max[1]) continue
				}
				let t = {
					hours: d.getHours(),
					minutes: d.getMinutes()
				}
				let m = t.minutes
				if (m < 10) m = '0' + m
				if (opts.ampm) {
					// 12h
					let ampm = 'am'
					let h = t.hours
					if (h >= 12) {
						ampm = 'pm'
						h = h - 12
					}
					if (h == 0) h = 12
					t.text = h + ':' + m + ' ' + ampm
					t.period = ampm
				} else {
					// 24h
					let h = t.hours
					if (h < 10) h = '0' + h
					t.text = h + ':' + m
				}
				this.times.push(t)
			}
		}
	</script>

</rg-timepicker>
