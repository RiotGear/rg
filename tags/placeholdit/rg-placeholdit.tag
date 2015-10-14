<rg-placeholdit>

	<img src="https://placeholdit.imgix.net/~text?bg={ RgPlaceholdit.background }&txtclr={ RgPlaceholdit.color }&txt={ RgPlaceholdit.text }&txtsize={ RgPlaceholdit.textsize }&w={ RgPlaceholdit.width }&h={ RgPlaceholdit.height }&fm={ RgPlaceholdit.format }">

	<script>
	this.on('mount', () => {
		this.RgPlaceholdit = opts.placeholdit || new RgPlaceholdit(opts)
		this.RgPlaceholdit.on('change', () => {
			this.update()
		})
		this.update()
	})

	</script>

</rg-placeholdit>
