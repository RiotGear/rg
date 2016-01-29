<rg-toasts>

	<div if="{ opts.toasts.isvisible }" class="toasts { 'toasts--' + opts.toasts.position }">
		<div each="{ opts.toasts.toasts }" class="toast { 'toast--' + type }" if="{ isvisible }" onclick="{ parent.toastClicked }">
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
				opts.toasts.position = opts.toasts.position || 'bottomright'
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

</rg-toasts>
