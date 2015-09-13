<rg-map>

	<div class="rg-map"></div>

	<script>

		let defaultOptions = {
			center: { lat: 53.806, lng: -1.535 },
			zoom: 5
		}
		let mapOptions = opts.map || defaultOptions

		rg.map.on('initialize', () => {
			var map = new google.maps.Map(this.root.querySelector('.rg-map'), mapOptions)
		});

		(() => {
			if (!document.getElementById('gmap_script')) {
				let script = document.createElement('script')
				script.setAttribute('id', 'gmap_script')
				script.type = 'text/javascript'
				script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=rg.map.initialize'
				document.body.appendChild(script)
			}
		})()

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
