<rg-toast>

	<div class="toasts { RgToasts.position } { isvisible: RgToasts.isvisible }">
		<div each="{ RgToasts.toasts }" class="toast { isvisible: isvisible }" onclick="{ parent.toastClicked }">
			<rg-raw content="{ content }"></rg-raw>
		</div>
	</div>

	<script>
		this.toastClicked = e => {
			let toast = e.item
			if (rg.isFunction(toast.onclick)) toast.onclick()
			if (rg.isFunction(toast.onclose)) toast.onclose()
			window.clearTimeout(toast.timer)
			toast.isvisible = false
		}

		this.on('mount', () => {
			this.RgToasts = opts.toasts || new RgToasts(opts)
			this.RgToasts.on('visibility change', () => {
				this.update()
			})
			this.update()
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

		.toasts.isvisible {
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

		.toast.isvisible {
			display: block;
		}
	</style>

</rg-toast>
