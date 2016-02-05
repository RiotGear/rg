<rg-unsplash>

	<img src="https://unsplash.it/{ opts.unsplash.greyscale }{ opts.unsplash.width }/{ opts.unsplash.height }/?{ options }">

	<script>
		this.on('update', () => {
			this.options = ''
			if (!opts.unsplash) opts.unsplash = {}
			opts.unsplash.width = opts.unsplash.width || 450
			opts.unsplash.height = opts.unsplash.height || 250
			if (opts.unsplash.greyscale) opts.unsplash.greyscale = 'g/'
			if (opts.unsplash.random) this.options += 'random&'
			if (opts.unsplash.blur) this.options += 'blur&'
			if (opts.unsplash.image) this.options += 'image=' + opts.unsplash.image + '&'
			if (typeof opts.unsplash.gravity !== 'undefined') this.options += 'gravity=' + opts.unsplash.gravity
		})

	</script>

</rg-unsplash>
