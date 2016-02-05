<rg-include>

	<div>
		{ responseText }
	</div>

	<script>
		const fetch = () => {
			const req = new XMLHttpRequest()
			req.onload = resp => {
				if (opts.include.unsafe) this.root.innerHTML = req.responseText
				else this.responseText = req.responseText
				this.update()
				this.trigger('loaded')
			}
			req.open('get', opts.include.url, true)
			req.send()
			this.trigger('loading')
		}

		this.on('mount', () => {
			fetch()
		})
	</script>

</rg-include>
