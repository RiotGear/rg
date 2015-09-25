<rg-select>

	<div class="container { visible: visible }" style="width: { width }">
		<input type="text"
					 class="field { visible: visible }"
					 onkeydown="{ handleKeys }"
					 onclick="{ toggle }"
					 value="{ fieldText }"
					 placeholder="{ opts.placeholder }"
					 readonly>

		<div class="dropdown { visible: visible }">
			<div class="filter">
				<input type="text"
							 name="filter"
							 class="filter-box"
							 placeholder="{ opts['filter-placeholder'] || 'Filter' }"
							 onkeydown="{ handleKeys }"
							 oninput="{ filterItems }">
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
		this.visible = true;

		/* istanbul ignore next */
		var handleClickOutside = e => {
			if (!this.root.contains(e.target)) {
				if (rg.isFunction(opts.onclose) && this.visible) opts.onclose()
				this.visible = false
				this.update()
			}
		}

		this.handleKeys = e => {
			if ([13, 38, 40].indexOf(e.keyCode) > -1 && !this.visible) {
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
			this.visible = !this.visible
			if (rg.isFunction(opts.onopen) && this.visible) opts.onopen()
			else if (rg.isFunction(opts.onclose) && !this.visible) opts.onclose()
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
			if (rg.isFunction(opts.onfilter)) opts.onfilter()
			this.update()
		}

		this.select = item => {
			item = item.item
			opts.options.forEach(item => item.selected = false)
			item.selected = true
			if (rg.isFunction(opts.onselect)) opts.onselect(item)
			this.fieldText = item.text
			this.visible = false
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

			// Set visible state
			this.visible = opts.visible

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
		}

		.dropdown.visible {
			display: block;
		}

		.filter-box {
			width: 100%;
			padding: 10px;
			font-size: 0.9rem;
			border: 0;
			outline: none;
			color: #555;
			box-sizing: border-box;
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
