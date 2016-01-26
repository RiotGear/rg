<rg-markdown>

	<div class="markdown"></div>

	<script>
		this.on('mount', () => {
			this.RgMarkdown = opts.markdown || new rg.Markdown(opts)
			this.RgMarkdown.on('update', () => {
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
