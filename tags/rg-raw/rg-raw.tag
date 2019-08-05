<rg-raw>
	<span></span>

	<script>
		this.on('mount', () => this.update())
		this.on('update', () => {
			this.root.innerHTML = opts.content || ''
		})
	</script>
</rg-raw>
