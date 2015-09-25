<rg-autocomplete>

	<div class="container { visible: visible }" style="width: { width }">
		<input type="{ opts.type || 'text' }" class="field" name="textbox" placeholder="{ opts.placeholder }" onkeydown="{ handleKeys }" oninput="{ filterItems }" onfocus="{ filterItems }">

		<div class="dropdown { visible: visible }">
			<ul class="list">
				<li each="{ filteredItems }" onclick="{ parent.select }" class="item { active: active }">
					{ text }
				</li>
			</ul>
		</div>
	</div>

	<script>
		this.visible = true
		this.textbox.value = rg.isDefined(opts.value) ? opts.value : ''

		this.filterItems = () => {
			this.filteredItems = opts.items.filter((item) => {
				item.active = false;
				if (this.textbox.value.length == 0 ||
					item.text.toString().toLowerCase().indexOf(this.textbox.value.toString().toLowerCase()) > -1) {
					return true
				}
			})
			this.visible = this.filteredItems.length > 0
			if (rg.isFunction(opts.onfilter)) opts.onfilter()
			this.update()
		}

		this.handleKeys = (e) => {
			var length = this.filteredItems.length
			if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
				this.visible = true
				e.preventDefault()
					// Get the currently selected item
				var activeIndex = null
				for (var i = 0; i < length; i++) {
					var item = this.filteredItems[i]
					if (item.active) {
						activeIndex = i
						break
					}
				}

				// We're leaving this item
				if (activeIndex != null) this.filteredItems[activeIndex].active = false

				if (e.keyCode == 38) {
					// Move the active state to the next item lower down the index
					if (activeIndex == null || activeIndex == 0)
						this.filteredItems[length - 1].active = true
					else
						this.filteredItems[activeIndex - 1].active = true
				} else if (e.keyCode == 40) {
					// Move the active state to the next item higher up the index
					if (activeIndex == null || activeIndex == length - 1)
						this.filteredItems[0].active = true
					else
						this.filteredItems[activeIndex + 1].active = true
				} else if (e.keyCode == 13 && activeIndex != null)
					this.select({
						item: this.filteredItems[activeIndex]
					})
			}
			return true
		};

		this.select = (item) => {
			item = item.item
			if (rg.isFunction(opts.onselect)) opts.onselect(item)
			this.textbox.value = item.text
			this.visible = false
		}

		this.closeDropdown = (e) => {
			if (!this.root.contains(e.target)) {
				if (rg.isFunction(opts.onclose) && this.visible) opts.onclose()
				this.visible = false
				this.update()
			}
		}

		this.on('mount', () => {
			document.addEventListener('click', this.closeDropdown)
			document.addEventListener('focus', this.closeDropdown, true)
			this.width = this.textbox.getBoundingClientRect().width + 'px'
			var dd = this.root.querySelector('.dropdown')
			dd.style.width = this.width
			dd.style.position = 'absolute'
			this.visible = opts.visible
			this.update()
		})

		this.on('unmount', () => {
			document.removeEventListener('click', this.closeDropdown)
			document.removeEventListener('focus', this.closeDropdown, true)
		})
	</script>

	<style scoped>
		.container {
			position: relative;
			display: inline-block;
			cursor: pointer;
		}

		.field {
			width: 100%;
			padding: 10px;
			border: 1px solid #D3D3D3;
			box-sizing: border-box;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 1em;
			line-height: normal;
			outline: 0;
		}

		.dropdown {
			display: none;
			position: relative;
			width: 100%;
			background-color: white;
			border: 1px solid #D3D3D3;
			border-top: 0;
			box-sizing: border-box;
			overflow-y: auto;
			overflow-x: hidden;
			max-height: 280px;
			z-index: 1;
		}

		.dropdown.visible {
			display: block;
		}

		.list,
		.item {
			list-style: none;
			padding: 0;
			margin: 0;
		}

		.item {
			padding: 10px;
			border-top: 1px solid #E8E8E8;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.item:first-child {
			border-top: 0;
		}

		.selected {
			font-weight: bold;
			background-color: #f8f8f8;
		}

		.item:hover {
			background-color: #f3f3f3;
		}

		.item.active,
		.item:hover.active {
			background-color: #ededed;
		}
	</style>
</rg-autocomplete>
