<rg-alert>

	<div each="{ opts.alerts }" class="alert { type } { visible: visible }" onclick="{ onclick }">
		<a class="close" aria-label="Close" onclick="{ parent.dismiss }" if="{ dismissable != false }">
			<span aria-hidden="true">&times;</span>
		</a>

		<div class="body">
			{ msg }
		</div>
	</div>

	<script>
		this.on('update', function() {
			opts.alerts.forEach((alert) => {
				if (rg.isUndefined(alert.visible)) {
					alert.visible = true
				}
				if (!alert.timer && alert.timeout) {
					alert.startTimer = () => {
						alert.timer = window.setTimeout(() => {
							remove(alert)
							this.update()
						}, rg.toNumber(alert.timeout))
					}
					alert.startTimer()
				}
			})
			this.update()
		})

		this.dismiss = (e) => {
			remove(e.item)
		}

		function remove(alert) {
			alert.visible = false
			if (rg.isFunction(alert.onclose)) alert.onclose()
			window.clearTimeout(alert.timer)
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
			display: none;
			position: relative;
			margin-bottom: 15px;
		}

		.visible {
			display: block;
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
