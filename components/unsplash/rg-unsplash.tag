<rg-unsplash>

	<img src="https://unsplash.it/{ grayscale }{ width }/{ height }/?{ options }">

	<script>
		this.width = opts.width || 450
		this.height = opts.height || 250
		this.options = ''
		if (opts.greyscale || opts.grayscale) this.grayscale = 'g/'
		if (opts.random) this.options += 'random&'
		if (opts.blur) this.options += 'blur&'
		if (opts.image) this.options += 'image=' + opts.image + '&'
		if (opts.gravity) this.options += 'gravity=' + opts.gravity
	</script>

</rg-unsplash>
