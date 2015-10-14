<rg-include>

	{{ responseText }}

	<script>
		this.on('mount', () => {
			this.RgInclude = opts.include || new RgInclude(opts)
			this.RgInclude.on('change', () => {
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
