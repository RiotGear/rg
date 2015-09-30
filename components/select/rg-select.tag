<rg-select>

	<div class="container { visible: visible }" style="width: { width }">
		<input if="{ !autocomplete }"
					 type="text"
					 name="selectfield"
					 class="field { visible: visible }"
					 value="{ fieldText }"
					 placeholder="{ opts.placeholder }"
					 onkeydown="{ handleKeys }"
					 onclick="{ toggle }"
					 readonly>

		<input if="{ autocomplete }"
					 type="text"
					 name="autocompletefield"
					 class="field { visible: visible }"
					 value="{ fieldText }"
					 placeholder="{ opts.placeholder }"
					 onkeydown="{ handleKeys }"
					 onclick="{ toggle }"
					 oninput="{ filterItems }">

		<div class="dropdown { visible: visible } { empty: filteredItems.length == 0 }">
			<div class="filter" if="{ filter }">
				<input type="text"
							 name="filterfield"
							 class="filter-box"
							 placeholder="{ opts['filter-placeholder'] || 'Filter' }"
							 onkeydown="{ handleKeys }"
							 oninput="{ filterItems }">
			</div>
			<ul class="list { empty: filteredItems.length == 0 }">
				<li each="{ filteredItems }"
						onclick="{ parent.select }"
						class="item { selected: selected, disabled: disabled, active: active }">
					{ text }
				</li>
			</ul>
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
				e.preventDefault()
				this.toggle()
				return true
			}
			if (this.autocomplete && !this.visible) this.visible = true
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
				const filterOn = opts['filter-on'] || 'text'
				const filterField = item[filterOn]
				if (rg.isUndefined(filterField)) throw Error(`filter-on field is undefined: option.${filterOn}`)
				let filterInput = this.filterfield.value
				if (this.autocomplete) filterInput = this.autocompletefield.value
				if (filterInput.length == 0 ||
					filterField.toString()
					           .toLowerCase()
										 .indexOf(filterInput.toString().toLowerCase()) > -1)
					return true
			})
			if (rg.isFunction(opts.onfilter)) opts.onfilter()
			this.update()
		}

		this.select = item => {
			item = item.item
			opts.options.forEach(i => i.selected = false)
			item.selected = true
			if (rg.isFunction(opts.onselect)) opts.onselect(item)
			this.selectfield.value = item.text
			this.autocompletefield.value = item.text
			this.visible = false
			if (this.autocomplete) this.filterItems()
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

			this.autocomplete = rg.toBoolean(opts.autocomplete)
			this.visible = rg.toBoolean(opts.visible)
			this.filter = rg.toBoolean(opts.filter)
			this.fieldText = opts.value
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
			border-bottom: 1px solid #D3D3D3;
			box-sizing: border-box;
			overflow-y: auto;
			overflow-x: hidden;
			max-height: 280px;
		}

		.dropdown.visible {
			display: block;
		}

		.dropdown.empty {
			border-bottom: 0;
		}

		.filter-box {
			width: 100%;
			padding: 10px;
			font-size: 0.9em;
			border: 0;
			border-left: 1px solid #D3D3D3;
			border-right: 1px solid #D3D3D3;
			border-bottom: 1px solid #E8E8E8;
			outline: none;
			color: #555;
			box-sizing: border-box;
		}

		.list, .item {
			list-style: none;
			padding: 0;
			margin: 0;
		}

		.list.empty {
			display: none;
		}

		.item {
			padding: 10px;
			border-left: 1px solid #D3D3D3;
			border-right: 1px solid #D3D3D3;
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
</rg-select>
