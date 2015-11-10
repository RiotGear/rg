<rg-sidemenu>

	<rg-drawer drawer="{ RgSidemenu }">

	<script>
		this.on('mount', () => {
			this.RgSidemenu = opts.sidemenu || new RgSidemenu(opts)
			this.RgSidemenu.position = 'left'
			this.RgSidemenu.on('update', () => {
				this.update()
			})
			this.update()
		})
	</script>

	<style scoped>
		.overlay {
			background-color: rgba(0, 0, 0, 0.8);
		}

		.overlay.visible {
			display: block;
		}

		.drawer {
			background-color: black;
			color: white;
		}

		.header {
			color: white;
		}

		.item {
			border-top: 1px solid #1a1a1a;
			color: white;
		}

		.item:last-child {
			border-bottom: 1px solid #1a1a1a;
		}

		.item:hover {
			background-color: #2a2a2a;
		}

		.item.active {
			background-color: #444;
		}

	</style>

</rg-sidemenu>
