<rg-time>

	<rg-select select="{ RgTime }"></rg-select>

	<script>
		const build = () => {
			this.RgTime.options = []

			for (var i = 0; i < 1440; i++) {
				if (i % this.RgTime.step == 0) {
					var d = new Date(0)
					d.setHours(this.RgTime.time.getHours())
					d.setMinutes(this.RgTime.time.getMinutes())
					d = new Date(d.getTime() + i * 60000)
						// Check min range
					if (this.RgTime.min) {
						if (d.getHours() < this.RgTime.min[0]) continue
						if (d.getHours() == this.RgTime.min[0] && d.getMinutes() < this.RgTime.min[1]) continue
					}
					// Check max range
					if (this.RgTime.max) {
						if (d.getHours() > this.RgTime.max[0]) continue
						if (d.getHours() == this.RgTime.max[0] && d.getMinutes() > this.RgTime.max[1]) continue
					}
					let t = {
						hours: d.getHours(),
						minutes: d.getMinutes()
					}
					let m = t.minutes
					if (m < 10) m = '0' + m
					if (this.RgTime.ampm) {
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
					this.RgTime.options.push(t)
				}
			}
		}

		this.on('mount', () => {
			this.RgTime = opts.time || new RgTime(opts)
			this.RgTime.on('change', () => {
				build()
				this.update()
			})
			build()
			this.update()
		})


	</script>

</rg-time>
