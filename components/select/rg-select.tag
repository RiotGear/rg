<rg-select>

	<div class="container { open: opened }" style="width: { width }">
		<input type="text"
					 class="field { open: opened}"
					 onkeydown="{ handleKeys }"
					 onclick="{ toggle }"
					 value="{ fieldText || opts.placeholder }"
					 readonly/>

		<div class="dropdown" show="{ opened }">
			<div class="filter">
				<input type="text"
							 name="filter"
							 class="filter-box"
							 placeholder="{ opts['filter-placeholder'] || 'Filter' }"
							 onkeydown="{ handleKeys }"
							 oninput="{ filterItems }"/>
			</div>
			<div class="list">
				<ul>
					<li each="{ filteredItems }"
							onclick="{ parent.select }"
							class="item { selected: selected, disabled: disabled, active: active }">
						{ text }
					</li>
				</ul>
			</div>
		</div>
	</div>

	<script>
		this.opened = true;

		var handleClickOutside = e => {
			if (!this.root.contains(e.target)) {
				if (opts.onclose && this.opened) opts.onclose()
				this.opened = false
				this.update()
			}
		}

		this.handleKeys = e => {
			if (e.keyCode == 13 && !this.opened) {
				this.toggle()
				return true
			}
			var length = this.filteredItems.length
			if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault()
				// Get the currently selected item
				var activeIndex = null
				for (let i = 0; i < length; i++) {
					let item = this.filteredItems[i]
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
				} else if (e.keyCode == 13 && activeIndex != null) {
					this.select({ item: this.filteredItems[activeIndex] })
				}
			}
			return true
		};

		this.toggle = () => {
			this.opened = !this.opened
			if (opts.onopen && this.opened) opts.onopen()
			else if (opts.onclose && !this.opened) opts.onclose()
		}

		this.filterItems = () => {
			this.filteredItems = opts.options.filter(item => {
				item.active = false
				var filterField = item[opts['filter-on'] || 'text']
				if (this.filter.value.length == 0 ||
					filterField.toString()
					           .toLowerCase()
										 .indexOf(this.filter.value.toString().toLowerCase()) > -1)
					return true
			})
			if (opts.onfilter) opts.onfilter()
			this.update()
		}

		this.select = item => {
			item = item.item
			opts.options.forEach(item => item.selected = false)
			item.selected = true
			if (opts.onselect) opts.onselect(item)
			this.fieldText = item.text
			this.opened = false
		}

		this.on('mount', () => {
			// Filter items
			this.filterItems()

			// Give each dropdown item an index and select one if applicable
			opts.options.forEach((item, i) => {
				item.index = i
				if (item.selected) this.select({ item })
			})

			// Setup listeners and style component given content
			document.addEventListener('click', handleClickOutside)
			var dd = this.root.querySelector('.dropdown')
			this.width = `${dd.getBoundingClientRect().width + 20}px`
			dd.style.position = 'absolute'

			// Set open state
			this.opened = opts.opened

			this.update()
		})

		this.on('unmount', () => document.removeEventListener('click', handleClickOutside))

	</script>

	<style scoped>

		.container {
			position: relative;
			display: inline-block;
			cursor: pointer;
		}

		.container.open {
			-webkit-box-shadow: 0 2px 10px -4px #444;
			-moz-box-shadow: 0 2px 10px -4px #444;
			box-shadow: 0 2px 10px -4px #444;
		}

		.field {
			width: 100%;
			padding: 10px;
			background-color: white;
			border: 1px solid #D3D3D3;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 1em;
			line-height: normal;
			outline: 0;
		}

		.down-arrow {
			float: right;
		}

		.dropdown {
			position: relative;
			width: 100%;
			background-color: white;
			border: 1px solid #D3D3D3;
			border-top: 0;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
		}

		.container.open .dropdown {
			-webkit-box-shadow: 0 2px 10px -4px #444;
			-moz-box-shadow: 0 2px 10px -4px #444;
			box-shadow: 0 2px 10px -4px #444;
		}

		.filter-box {
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			width: 100%;
			padding: 10px;
			font-size: 0.9rem;
			border: 0;
			outline: none;
			color: #555;
		}

		ul, li {
			list-style: none;
			padding: 0;
			margin: 0;
		}

		li {
			padding: 10px;
			border-top: 1px solid #E8E8E8;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.selected {
			font-weight: bold;
			background-color: #f8f8f8;
		}

		li:hover {
			background-color: #f3f3f3;
		}

		li.active,
		li:hover.active {
			background-color: #ededed;
		}

	</style>
</rg-select>
