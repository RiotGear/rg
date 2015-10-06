<rg-sidemenu>

	<div class="overlay { visible: visible }" onclick="{ close }"></div>

	<div class="sidemenu { visible: visible }">
		<h4 class="header">{ opts.header }</h4>

		<ul class="items">
			<li class="item { active: active }" each="{ opts.items }" onclick="{ selected }">
				<rg-raw content="{ content }"></rg-raw>
			</li>
		</ul>

		<div class="body">
			<yield/>
		</div>
	</div>

	<script>
		this.on('update', function () {
			this.visible = rg.toBoolean(opts.visible)
		})

		this.close = function () {
			if (rg.isFunction(opts.onclose)) opts.onclose()
		}

		this.selected = item => {
			item = item.item
			opts.items.forEach(item => item.active = false)
			item.active = true
			if (item.action) item.action(item)
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
