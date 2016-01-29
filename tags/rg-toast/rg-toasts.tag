<rg-toasts>

	<div if="{ opts.toasts.isvisible }" class="toasts { opts.toasts.position || 'bottomright' }">
		<div each="{ opts.toasts.toasts }" class="toast { isvisible: isvisible }" onclick="{ parent.toastClicked }">
			{ text }
		</div>
	</div>

	<script>
		this.toastClicked = e => {
			let toast = e.item
			window.clearTimeout(toast.timer)
			toast.isvisible = false
			this.trigger('select', toast)
		}

		let _uid = 1
		const uid = () => _uid++

		this.on('update', () => {
			if (!opts.toasts || !Array.isArray(opts.toasts.toasts)) return

			opts.toasts.toasts.forEach(toast => {
				if (typeof toast.isvisible == 'undefined') toast.isvisible = true
				toast.id = toast.id || uid()
				if (!toast.timer && !toast.sticky) {
					toast.startTimer = () => {
						toast.timer = window.setTimeout(() => {
							toast.isvisible = false
							this.trigger('close', toast)
							this.update()
						}, toast.timeout || 6000)
					}
					toast.startTimer()
				}
			})
			opts.toasts.isvisible = opts.toasts.toasts.filter(toast => toast.isvisible).length > 0
		})

	</script>

	<style scoped>
		.toasts {
			position: fixed;
			width: 250px;
			max-height: 100%;
			overflow-y: auto;
			background-color: transparent;
			z-index: 101;
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

		.toast.isvisible {
			display: block;
		}

	</style>

</rg-toasts>
