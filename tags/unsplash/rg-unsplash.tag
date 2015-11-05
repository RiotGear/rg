<rg-unsplash>

	<img src="https://unsplash.it/{ greyscale }{ RgUnsplash.width }/{ RgUnsplash.height }/?{ options }">

	<script>
		this.on('mount', () => {
			this.RgUnsplash = opts.unsplash || new RgUnsplash()
			this.RgUnsplash.on('update', () => {
				this.update()
			})
			this.on('update', () => {
				this.options = ''
				if (this.RgUnsplash.greyscale) this.greyscale = 'g/'
				if (this.RgUnsplash.random) this.options += 'random&'
				if (this.RgUnsplash.blur) this.options += 'blur&'
				if (this.RgUnsplash.image) this.options += 'image=' + this.RgUnsplash.image + '&'
				if (rg.isDefined(this.RgUnsplash.gravity)) this.options += 'gravity=' + this.RgUnsplash.gravity
			})
			this.update()
		})
	</script>

</rg-unsplash>
