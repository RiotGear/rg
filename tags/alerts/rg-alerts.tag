<rg-alerts>

	<div each="{ RgAlerts.alerts }" class="alert { type } { isvisible: isvisible }" onclick="{ select }">
		<a class="close" aria-label="Close" onclick="{ parent.dismiss }" if="{ dismissable != false }">
			<span aria-hidden="true">&times;</span>
		</a>
		<rg-raw content="{ content }"></rg-raw>
	</div>

	<script>
		this.on('mount', function() {
			this.RgAlerts = opts.alerts || new RgAlerts(opts)
			this.RgAlerts.on('update', () => {
				this.update()
			})
			this.update()
		})

		this.dismiss = e => {
			const alert = e.item
			this.RgAlerts.dismiss(alert)
		}

		this.select = e => {
			const alert = e.item
			this.RgAlerts.select(alert)
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
			padding: 15px 35px 15px 15px;
		}

		.isvisible {
			display: block;
		}

		.close {
			position: absolute;
			top: 50%;
			right: 20px;
			line-height: 12px;
			font-size: 1.1em;
			border: 0;
			background-color: transparent;
			color: rgba(0, 0, 0, 0.5);
			cursor: pointer;
			outline: none;
			transform: translate3d(0, -50%, 0);
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

</rg-alerts>
