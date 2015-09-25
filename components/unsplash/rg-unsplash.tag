<rg-unsplash>

	<img src="https://unsplash.it/{ grayscale }{ width }/{ height }/?{ options }">

	<script>
		this.width = opts.width || 450
		this.height = opts.height || 250
		this.options = ''
		if (rg.toBoolean(opts.greyscale) || rg.toBoolean(opts.grayscale)) this.grayscale = 'g/'
		if (rg.toBoolean(opts.random)) this.options += 'random&'
		if (rg.toBoolean(opts.blur)) this.options += 'blur&'
		if (rg.toNumber(opts.image)) this.options += 'image=' + opts.image + '&'
		if (rg.isDefined(opts.gravity)) this.options += 'gravity=' + opts.gravity
	</script>

</rg-unsplash>
