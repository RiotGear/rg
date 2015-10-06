<rg-placeholdit>

	<img src="https://placeholdit.imgix.net/~text?bg={ background }&txtclr={ color }&txt={ text }&txtsize={ textSize }&w={ width }&h={ height }&fm={ format }">

	<script>
		this.width = opts.width || 450
		this.height = opts.height || 250
		this.background = opts['background-color'] || 'f01e52'
		this.color = opts.color || 'fff'
		this.text = opts.text || `${this.width} x ${this.height}`
		this.textSize = opts['font-size'] || '30'
		this.format = opts.format || 'png'
	</script>

</rg-placeholdit>
