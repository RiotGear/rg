<rg-context-menu>

	<div class="menu { isvisible: RgContextMenu.isvisible }">
		<div class="list">
			<div each="{ RgContextMenu.items }" class="item { inactive: inactive }" onclick="{ selectItem }">
				<rg-raw content="{ content }"></rg-raw>
			</div>
			<yield/>
		</div>
	</div>

	<script>
		const handleClickOutside = e => {
			if (!this.root.contains(e.target)) {
				if (this.RgContextMenu.isvisible) this.RgContextMenu.trigger('close')
				this.RgContextMenu.isvisible = false
				this.update()
			}
		}

		const openMenu = e => {
			e.preventDefault()
			this.RgContextMenu.isvisible = true
			this.RgContextMenu.trigger('open')

			var x = e.pageX
			var y = e.pageY
			var dd = this.root.querySelector('.menu')
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
			this.RgContextMenu = opts.menu || new rg.ContextMenu(opts)
			this.RgContextMenu.on('update', () => {
				this.update()
			})
			document.addEventListener('click', handleClickOutside)
			let targets = document.querySelectorAll('[rg-context-menu]')
			for (var i = 0, target; target = targets[i]; i++) {
				if (target.attributes['rg-context-menu'].value == this.RgContextMenu.name)
					target.addEventListener('contextmenu', openMenu)
				else
					target.addEventListener('contextmenu', this.closeMenu)
			}
			this.update()
		});

		this.on('unmount', () => {
			document.removeEventListener('click', handleClickOutside)
			let targets = document.querySelectorAll('[rg-context-menu]')
			for (var i = 0, target; target = targets[i]; i++) {
				if (target.attributes['rg-context-menu'].value == this.RgContextMenu.name)
					target.removeEventListener('contextmenu', openMenu)
				else
					target.removeEventListener('contextmenu', this.closeMenu)
			}
		})

		this.closeMenu = () => {
			this.RgContextMenu.isvisible = false
		}

		this.selectItem = item => {
			item = item.item
			this.RgContextMenu.select(item)
		}

	</script>

	<style scoped>
		.menu {
			display: none;
			position: absolute;
			background-color: white;
			border: 1px solid #D3D3D3;
			text-align: left;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			box-sizing: border-box;
			z-index: 2;
		}

		.menu.isvisible {
			display: block;
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

		.item:first-child {
			border-top: 0;
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
