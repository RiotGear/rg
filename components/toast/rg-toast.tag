<rg-toast>

	<div class="toasts { opts.position } { active: active }">
		<div each="{ opts.toasts }" class="toast { visible: visible }" onclick="{ parent.toastClicked }">
			<rg-raw content="{ content }"></rg-raw>
		</div>
	</div>

	<script>
		if (!opts.position) opts.position = 'topright'

		this.toastClicked = e => {
			let toast = e.item
			if (rg.isFunction(toast.onclick)) toast.onclick()
			if (rg.isFunction(toast.onclose)) toast.onclose()
			window.clearTimeout(toast.timer)
			toast.visible = false
		}

		this.on('update', () => {
			opts.toasts.forEach(toast => {
				if (rg.isUndefined(toast.visible)) toast.visible = true
				toast.id = Math.random().toString(36).substr(2, 8)
				if (!toast.timer && !toast.sticky) {
					toast.startTimer = () => {
						toast.timer = window.setTimeout(() => {
							toast.visible = false
							if (rg.isFunction(toast.onclose)) toast.onclose()
							this.update()
						}, rg.toNumber(toast.timeout) || 6000)
					}
					toast.startTimer()
				}
			})

			this.active = opts.toasts.filter(toast => toast.visible).length
		})
	</script>

	<style scoped>
		.toasts {
			display: none;
			position: absolute;
			width: 250px;
			max-height: 100%;
			overflow-y: auto;
			background-color: transparent;
			z-index: 101;
		}

		.toasts.active {
			display: block;
		}

		.toasts.topleft {
			top: 0;
			left: 0;
		}

		.toasts.topright {
			top: 0;
			right: 0;
		}

		.toasts.bottomleft {
			bottom: 0;
			left: 0;
		}

		.toasts.bottomright {
			bottom: 0;
			right: 0;
		}

		.toast {
			display: none;
			padding: 20px;
			margin: 20px;
			background-color: #000;
			color: white;
			font-size: 0.9em;
			cursor: pointer;
		}

		.toast.visible {
			display: block;
		}
	</style>

</rg-toast>
