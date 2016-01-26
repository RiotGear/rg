<rg-include>

	<div>
		{ responseText }
	</div>

	<script>
		this.on('mount', () => {
			this.RgInclude = opts.include || new rg.Include(opts)
			this.RgInclude.on('update', () => {
				this.RgInclude.fetch()
			})
			this.RgInclude.on('fetch', content => {
				if (this.RgInclude.unsafe) this.root.innerHTML = content
				else this.responseText = content
				this.update()
			})
			this.RgInclude.fetch()
		})
	</script>

</rg-include>
