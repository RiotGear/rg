<rg-context-menu>

	<div class="dropdown" show="{ opts.menu.opened }">
		<div class="list">
			<div each="{ opts.menu.items }" class="item { inactive: inactive }" onclick="{ selectItem }">
				<rg-raw if="{ content && !text }" content="{ content }"></rg-raw>
				<span if="{ text }">{ text }</span>
			</div>
			<yield/>
		</div>
	</div>

	<script>

		opts.menu = opts.menu || {}

		var handleClickOutside = e => {
			if (!this.root.contains(e.target)) {
				if (opts.menu.onclose && opts.menu.opened) opts.menu.onclose(e)
				opts.menu.opened = false
				this.update()
			}
		}

		var openMenu = e => {
			e.preventDefault()
			if (opts.menu.onopen) opts.menu.onopen(e)
			opts.menu.opened = true
			// Need to update the page with the
			// rendered element to work with it
			this.update()

			var x = e.pageX
			var y = e.pageY
			var dd = this.root.querySelector('.dropdown')
			var ddRect = dd.getBoundingClientRect()
			// Handle horizontal boundary
			if (x > (window.innerWidth + window.scrollX) - ddRect.width) // Its too close to the edge!
				x = (window.innerWidth + window.scrollX) - ddRect.width

			dd.style.left = x + 'px'

			// Handle vertical boundary
			if (y > (window.innerHeight + window.scrollY) - ddRect.height) // Its too close to the edge!
				y = (window.innerHeight + window.scrollY) - ddRect.height

			dd.style.top = y + 'px'
			this.update()
		}

		this.on('mount', () => {
			document.addEventListener('click', handleClickOutside)
			let targets = document.querySelectorAll('[rg-context-menu]')
			for (var i = 0, target; target = targets[i]; i++) {
				if (target.attributes['rg-context-menu'].value == opts.id)
					target.addEventListener('contextmenu', openMenu)
				else
					target.addEventListener('contextmenu', _this.closeMenu)
			}
		});

		this.on('unmount', () => {
			document.removeEventListener('click', handleClickOutside)
			let targets = document.querySelectorAll('[rg-context-menu]')
			for (var i = 0, target; target = targets[i]; i++) {
				if (target.attributes['rg-context-menu'].value == opts.id)
					target.removeEventListener('contextmenu', openMenu)
				else
					target.removeEventListener('contextmenu', _this.closeMenu)
			}
		})

		this.closeMenu = () => {
			opts.menu.opened = false
			this.update()
		}

		this.selectItem = e => {
			if (!e.item.inactive) {
				if (e.item.onselect) e.item.onselect(e.item)

				opts.menu.opened = false
			}
		}

	</script>

	<style scoped>

		.dropdown {
			position: absolute;
			background-color: white;
			border: 1px solid #D3D3D3;
			border-top: 0;
			text-align: left;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			-webkit-box-shadow: 0 2px 10px -4px #444;
			-moz-box-shadow: 0 2px 10px -4px #444;
			box-shadow: 0 2px 10px -4px #444;
			z-index: 1;
		}

		.item {
			cursor: pointer;
			padding: 10px;
			border-top: 1px solid #E8E8E8;
			background-color: #fff;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.item:hover {
			background-color: #f3f3f3;
		}

		.item.inactive {
			color: #8a8a8a;
			font-style: italic;
		}

		.item.inactive:hover {
			background-color: #fff;
		}

	</style>

</rg-context-menu>
