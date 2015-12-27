<rg-placeholdit>

	<img src="https://placeholdit.imgix.net/~text?bg={ RgPlaceholdit.background }&txtclr={ RgPlaceholdit.color }&txt={ RgPlaceholdit.text }&txtsize={ RgPlaceholdit.textsize }&w={ RgPlaceholdit.width }&h={ RgPlaceholdit.height }&fm={ RgPlaceholdit.format }">

	<script>
	this.on('mount', () => {
		this.RgPlaceholdit = opts.placeholdit || new rg.Placeholdit(opts)
		this.RgPlaceholdit.on('update', () => {
			this.update()
		})
		this.update()
	})

	</script>

</rg-placeholdit>
