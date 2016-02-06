<rg-map>

	<div class="rg-map"></div>

	<script>
		window.rg = window.rg || {}
		window.rg.gmap = riot.observable({
			initialize: () => {
				window.rg.gmap.trigger('initialize')
			}
		})

		this.on('mount', () => {
			if (!opts.map) opts.map = {
				center: {
					lat: 53.806,
					lng: -1.535
				},
				zoom: 7
			}

			/* istanbul ignore next */
			rg.gmap.on('initialize', () => {
				opts.map.mapObj = new google.maps.Map(this.root.querySelector('.rg-map'), opts.map)
				this.trigger('loaded', opts.map.mapObj)
			})

			if (!document.getElementById('gmap_script')) {
				let script = document.createElement('script')
				script.setAttribute('id', 'gmap_script')
				script.type = 'text/javascript'
				script.src = 'https://maps.googleapis.com/maps/api/js?callback=window.rg.gmap.initialize'
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
