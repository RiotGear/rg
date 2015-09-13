<rg-alert>

	<div each="{ opts.alerts }" class="alert { type }" onclick="{ onclick }">
		<a class="close" aria-label="Close" onclick="{ parent.remove }" if="{ dismissable != false }">
			<span aria-hidden="true">&times;</span>
		</a>

		<div class="body">
			{ msg }
		</div>
	</div>

	<script>
		this.on('update', () => {
			opts.alerts.forEach((alert) => {
				alert.id = Math.random().toString(36).substr(2, 8)
				if (!alert.timer && alert.timeout) {
					alert.startTimer = () => {
						alert.timer = window.setTimeout(() => {
							opts.alerts.splice(opts.alerts.indexOf(alert), 1)
							if (alert.onclose) alert.onclose()
							this.update()
						}, alert.timeout)
					}
					alert.startTimer()
				}
			})
		})

		this.remove = (e) => {
			e.stopPropagation()
			if (e.item.onclose) e.item.onclose()
			window.clearTimeout(e.item.timer)
			opts.alerts.splice(opts.alerts.indexOf(e.item), 1)
		}
	</script>

	<style scoped>

		:scope {
			font-size: 0.9em;
			position: relative;
			top: 0;
			right: 0;
			left: 0;
			width: 100%;
		}

		.alert {
			position: relative;
			margin-bottom: 15px;
		}

		.body {
			padding: 15px 35px 15px 15px;
		}

		.close {
			position: absolute;
			top: 50%;
			right: 20px;
			line-height: 12px;
			margin-top: -6px;
			font-size: 18px;
			border: 0;
			background-color: transparent;
			color: rgba(0, 0, 0, 0.5);
			cursor: pointer;
			outline: none;
		}

		.danger {
			color: #8f1d2e;
			background-color: #ffced8;
		}

		.information {
			color: #31708f;
			background-color: #d9edf7;
		}

		.success {
			color: #2d8f40;
			background-color: #ccf7d4;
		}

		.warning {
			color: #c06329;
			background-color: #f7dfd0;
		}

	</style>

</rg-alert>
