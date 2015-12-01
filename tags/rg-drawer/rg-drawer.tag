<rg-drawer>

	<div class="overlay { visible: RgDrawer.isvisible }" onclick="{ close }"></div>

	<div class="drawer { RgDrawer.position } { visible: RgDrawer.isvisible }">
		<h4 class="header">{ RgDrawer.header }</h4>

		<ul class="items">
			<li class="item { active: active }" each="{ RgDrawer.items }" onclick="{ parent.select }">
				<rg-raw content="{ content }"></rg-raw>
			</li>
		</ul>

		<div class="body">
			<yield/>
		</div>
	</div>

	<script>
		this.on('mount', () => {
			this.RgDrawer = opts.drawer || new RgDrawer(opts)
			this.RgDrawer.on('update', () => {
				this.update()
			})
			this.update()
		})

		this.close = () => {
			this.RgDrawer.close()
		}

		this.select = e => {
			this.RgDrawer.select(e.item)
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
			background-color: rgba(0, 0, 0, 0.5);
			cursor: pointer;
			z-index: 50;
		}

		.overlay.visible {
			display: block;
		}

		.drawer {
			position: absolute;
			overflow-y: auto;
			overflow-x: hidden;
			-webkit-overflow-scrolling: touch;
			background-color: white;
			color: black;
			transition: transform 0.5s ease;
			z-index: 51;
		}

		.drawer.bottom {
			top: 100%;
			left: 0;
			height: auto;
			width: 80%;
			margin-left: 10%;
			transform: translate3d(0, 0, 0);
		}

		.drawer.bottom.visible {
			transform: translate3d(0, -100%, 0);
		}

		.drawer.top {
			bottom: 100%;
			left: 0;
			height: auto;
			width: 80%;
			margin-left: 10%;
			transform: translate3d(0, 0, 0);
		}

		.drawer.top.visible {
			transform: translate3d(0, 100%, 0);
		}

		.drawer.left {
			top: 0;
			left: 0;
			height: 100%;
			width: 260px;
			transform: translate3d(-100%, 0, 0);
		}

		.drawer.left.visible {
			transform: translate3d(0, 0, 0);
		}

		.drawer.right {
			top: 0;
			left: 100%;
			height: 100%;
			width: 260px;
			transform: translate3d(0, 0, 0);
		}

		.drawer.right.visible {
			transform: translate3d(-100%, 0, 0);
		}

		.header {
			padding: 1.2rem;
			margin: 0;
			text-align: center;
		}

		.items {
			padding: 0;
			margin: 0;
			list-style: none;
		}

		.item {
			padding: 1rem 0.5rem;
			box-sizing: border-box;
			border-top: 1px solid #E8E8E8;
		}

		.item:last-child {
			border-bottom: 1px solid #E8E8E8;
		}

		.item:hover {
			cursor: pointer;
			background-color: #E8E8E8;
		}

		.item.active {
			cursor: pointer;
			background-color: #EEE;
		}

	</style>

</rg-drawer>
