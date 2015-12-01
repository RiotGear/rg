class RgAlerts {

	constructor(opts) {
		riot.observable(this)
		if (!opts) opts = {}
		this.alerts = []
		if (!Array.isArray(opts.alerts)) return
		opts.alerts.forEach((alert) => {
			this.add(alert)
		})
	}

	update() {
		this.trigger('update')
	}

	add(alert) {
		alert._id = alert._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36)
		if (typeof alert.isvisible === 'undefined') alert.isvisible = true
		if (alert.timeout) {
			alert.startTimer = () => {
				alert.timer = setTimeout(() => {
					this.dismiss(alert)
					this.update()
				}, alert.timeout)
			}
			alert.startTimer()
		}
		this.alerts.push(alert)
		this.trigger('add', alert)
	}

	dismiss(alert) {
		alert.isvisible = false
		clearTimeout(alert.timer)
		this.trigger('dismiss', alert)
	}

	select(alert) {
		if (alert.onclick) alert.onclick(alert)
		this.trigger('select', alert)
	}
}
