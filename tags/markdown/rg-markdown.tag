<rg-markdown>

	<div class="markdown"></div>

	<script>
		this.on('mount', () => {
			this.RgMarkdown = opts.markdown || new RgMarkdown()
			this.RgMarkdown.on('change', () => {
				this.RgMarkdown.fetch()
			})
			this.RgMarkdown.on('fetch', md => {
				this.RgMarkdown.parse(md)
			})
			this.RgMarkdown.on('parse', content => {
				this.root.innerHTML = content
				this.update()
			})
			this.RgMarkdown.fetch()
		})
	</script>

</rg-markdown>
