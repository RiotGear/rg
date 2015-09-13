<rg-toast>

	<div class="toasts { opts.position }" if="{ opts.toasts.length > 0 }">
		<div class="toast" each="{ opts.toasts }" onclick="{ parent.toastClicked }">
			{ text }
		</div>
	</div>

	<script>
		if (!opts.position) opts.position = 'topright'

		this.toastClicked = e => {
			if (e.item.onclick)	e.item.onclick(e)
			if (e.item.onclose)	e.item.onclose()
			window.clearTimeout(e.item.timer)
			opts.toasts.splice(opts.toasts.indexOf(e.item), 1)
		}

		this.on('update', () => {
			opts.toasts.forEach(toast => {
				toast.id = Math.random().toString(36).substr(2, 8)
				if (!toast.timer && !toast.sticky) {
					toast.startTimer = () => {
						toast.timer = window.setTimeout(() => {
							opts.toasts.splice(opts.toasts.indexOf(toast), 1)
							if (toast.onclose) toast.onclose()
							this.update()
						}, toast.timeout || 6000)
					}
					toast.startTimer()
				}
			})
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
			padding: 20px;
			margin: 20px;
			background-color: rgba(0, 0, 0, 0.8);
			color: white;
			font-size: 13px;
			cursor: pointer;
		}

	</style>

</rg-toast>
