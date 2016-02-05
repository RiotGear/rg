<rg-markdown>

	<script>
		if (commonmark) {
			this.reader = new commonmark.Parser()
			this.writer = new commonmark.HtmlRenderer()
		}

		this.on('update', () => {
			if (!opts.markdown) opts.markdown = {}
			if (opts.markdown.content) {
				this.root.innerHTML = this.writer.render(this.reader.parse(opts.markdown.content))
			} else if (opts.markdown.url) {
				const req = new XMLHttpRequest()
				req.onload = resp => {
					this.root.innerHTML = this.writer.render(this.reader.parse(req.responseText))
					this.trigger('loaded')
				}
				req.open('get', opts.markdown.url, true)
				req.send()
				this.trigger('loading')
			}
		})

	</script>

</rg-markdown>
