<rg-markdown>

	<div class="markdown"></div>

	<script>
		var reader = new commonmark.Parser()
		var writer = new commonmark.HtmlRenderer()

		var markItDown = content => {
			var parsed = reader.parse(content)
			this.root.innerHTML = writer.render(parsed)
		}

		/* istanbul ignore next */
		if (opts.src) {
			rg.xhr('get', opts.src, resp => {
				markItDown(resp)
				this.update()
			})
		} else {
			markItDown(opts.content)
		}
	</script>

</rg-markdown>
