<rg-map>

	<div class="rg-map"></div>

	<script>
		this.on('mount', () => {
			this.RgMap = opts.map || new rg.Map(opts)
			/* istanbul ignore next */
			rg.gmap.on('initialize', () => {
				this.RgMap.obj = new google.maps.Map(this.root.querySelector('.rg-map'), this.RgMap.options)
			})

			if (!document.getElementById('gmap_script')) {
				let script = document.createElement('script')
				script.setAttribute('id', 'gmap_script')
				script.type = 'text/javascript'
				script.src = 'https://maps.googleapis.com/maps/api/js?callback=rg.gmap.initialize'
				document.body.appendChild(script)
			}
		})

	</script>

	<style scoped>
		.rg-map {
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
		}

		.rg-map img {
			max-width: inherit;
		}

	</style>

</rg-map>
