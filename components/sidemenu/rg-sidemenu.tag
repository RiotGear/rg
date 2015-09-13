<rg-sidemenu>

	<div class="overlay { expanded: opts.sidemenu.expanded }" onclick="{ close }"></div>

	<div class="sidemenu { expanded: opts.sidemenu.expanded }">
		<h4 class="header">{ opts.sidemenu.header }</h4>

		<ul class="items">
			<li class="item { active: active }" each="{ opts.sidemenu.items }" onclick="{ selected }">
				{ text }
			</li>
		</ul>

		<div class="body">
			<yield/>
		</div>
	</div>

	<script>
		this.close = () => opts.sidemenu.expanded = false

		this.selected = item => {
			item = item.item
			opts.sidemenu.items.forEach(item => item.active = false)
			item.active = true
			if (item.action) item.action(item)
		}
	</script>

	<style scoped>

		.overlay {
			position: fixed;
			top: 0;
			left: -100%;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background-color: transparent;
			cursor: pointer;
			-webkit-transition: background-color 0.8s ease, left 0s 0.8s;
			-moz-transition: background-color 0.8s ease, left 0s 0.8s;
			-ms-transition: background-color 0.8s ease, left 0s 0.8s;
			-o-transition: background-color 0.8s ease, left 0s 0.8s;
			transition: background-color 0.8s ease, left 0s 0.8s;
			z-index: 50;
		}

		.overlay.expanded {
			left: 0;
			background-color: rgba(0, 0, 0, 0.8);
			-webkit-transition: background-color 0.8s ease, left 0s;
			-moz-transition: background-color 0.8s ease, left 0s;
			-ms-transition: background-color 0.8s ease, left 0s;
			-o-transition: background-color 0.8s ease, left 0s;
			transition: background-color 0.8s ease, left 0s;
		}

		.sidemenu {
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 260px;
			overflow-y: auto;
			overflow-x: hidden;
			-webkit-overflow-scrolling: touch;
			background-color: black;
			color: white;
			-webkit-transform: translate3d(-100%, 0, 0);
			-moz-transform: translate3d(-100%, 0, 0);
			-ms-transform: translate3d(-100%, 0, 0);
			-o-transform: translate3d(-100%, 0, 0);
			transform: translate3d(-100%, 0, 0);
			-webkit-transition: -webkit-transform 0.5s ease;
			-moz-transition: -moz-transform 0.5s ease;
			-ms-transition: -ms-transform 0.5s ease;
			-o-transition: -o-transform 0.5s ease;
			transition: transform 0.5s ease;
			z-index: 51;
		}

		.sidemenu.expanded {
			-webkit-transform: translate3d(0, 0, 0);
			-moz-transform: translate3d(0, 0, 0);
			-ms-transform: translate3d(0, 0, 0);
			-o-transform: translate3d(0, 0, 0);
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
