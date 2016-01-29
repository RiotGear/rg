<rg-alerts>

	<div class="alerts">
		<div each="{ opts.alerts }" class="alerts__alert { 'alerts__alert--' + type }" if="{ isvisible }" onclick="{ select }">
			<button class="button button--close" if="{ dismissable != false }" onclick="{ parent.dismiss }">
				&times;
			</button>
			{ text }
		</div>
	</div>

	<script>
		this.on('update', () => {
			if (!opts.alerts) return
			opts.alerts.forEach(alert => {
				alert._id = alert._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36)
				if (typeof alert.isvisible === 'undefined') alert.isvisible = true
				if (alert.timeout) {
					alert.startTimer = () => {
						alert.timer = setTimeout(() => {
							this.dismiss({
								item: alert
							})
						}, alert.timeout)
					}
					alert.startTimer()
				}
			})
		})

		this.dismiss = e => {
			const alert = e.item
			alert.isvisible = false
			clearTimeout(alert.timer)
			this.trigger('dismiss', alert)
			this.update()
		}

		this.select = e => {
			const alert = e.item
			if (alert.onclick) alert.onclick(alert)
			this.trigger('select', alert)
		}

	</script>
</rg-alerts>
