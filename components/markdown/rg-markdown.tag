<rg-markdown>

	<div class="markdown"></div>

	<script>
		var reader = new commonmark.Parser()
		var writer = new commonmark.HtmlRenderer()

		var markItDown = content => {
			var parsed = reader.parse(content)
			this.root.innerHTML = writer.render(parsed)
		}

		if (opts.src) {
			var oReq = new XMLHttpRequest()
			oReq.onload = () => {
				markItDown(oReq.responseText)
				this.update()
			}
			oReq.open('get', opts.src, opts.async || true)
			oReq.send()
		} else {
			markItDown(opts.content)
		}
	</script>

</rg-markdown>
