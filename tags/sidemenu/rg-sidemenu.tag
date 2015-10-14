<rg-sidemenu>

	<div class="overlay { visible: RgSidemenu.isvisible }" onclick="{ close }"></div>

	<div class="sidemenu { visible: RgSidemenu.isvisible }">
		<h4 class="header">{ RgSidemenu.header }</h4>

		<ul class="items">
			<li class="item { active: active }" each="{ RgSidemenu.items }" onclick="{ parent.select }">
				<rg-raw content="{ content }"></rg-raw>
			</li>
		</ul>

		<div class="body">
			<yield/>
		</div>
	</div>

	<script>
		this.on('mount', () => {
			this.RgSidemenu = opts.sidemenu || new RgSidemenu(opts)
			this.RgSidemenu.on('change visibility', () => {
				this.update()
			})
			this.update()
		})

		this.close = () => {
			this.RgSidemenu.close()
		}

		this.select = e => {
			this.RgSidemenu.select(e.item)
		}

	</script>

	<style scoped>
		.overlay {
			display: none;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.8);
			cursor: pointer;
			z-index: 50;
		}

		.overlay.visible {
			display: block;
		}

		.sidemenu {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 260px;
			overflow-y: auto;
			overflow-x: hidden;
			-webkit-overflow-scrolling: touch;
			background-color: black;
			color: white;
			transform: translate3d(-100%, 0, 0);
			transition: transform 0.5s ease;
			z-index: 51;
		}

		.sidemenu.visible {
			transform: translate3d(0, 0, 0);
		}

		.header {
			padding: 1.2rem;
			margin: 0;
			text-align: center;
			color: white;
		}

		.items {
			padding: 0;
			margin: 0;
			list-style: none;
		}

		.item {
			padding: 1rem 0.5rem;
			box-sizing: border-box;
			border-top: 1px solid #1a1a1a;
			color: white;
		}

		.item:last-child {
			border-bottom: 1px solid #1a1a1a;
		}

		.item:hover {
			cursor: pointer;
			background-color: #2a2a2a;
		}

		.item.active {
			cursor: pointer;
			background-color: #444;
		}

	</style>

</rg-sidemenu>
