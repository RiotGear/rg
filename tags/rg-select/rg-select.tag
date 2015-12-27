<rg-select>

	<div class="container { visible: RgSelect.isvisible }" style="width: { width }">
		<input if="{ !RgSelect.autocomplete }"
					 type="text"
					 name="selectfield"
					 class="field { visible: RgSelect.isvisible }"
					 value="{ fieldText }"
					 placeholder="{ RgSelect.placeholder }"
					 onkeydown="{ handleKeys }"
					 onclick="{ toggle }"
					 readonly>

		<input if="{ RgSelect.autocomplete }"
					 type="text"
					 name="autocompletefield"
					 class="field { visible: RgSelect.isvisible }"
					 value="{ fieldText }"
					 placeholder="{ RgSelect.placeholder }"
					 onkeydown="{ handleKeys }"
					 onclick="{ toggle }"
					 oninput="{ filter }">

		<div class="dropdown { isvisible: RgSelect.isvisible } { empty: RgSelect.filtereditems.length == 0 }">
			<div class="filter" if="{ RgSelect.hasfilter && !RgSelect.autocomplete }">
				<input type="text"
							 name="filterfield"
							 class="filter-box"
							 placeholder="{ RgSelect.filterplaceholder || 'Filter' }"
							 onkeydown="{ handleKeys }"
							 oninput="{ filter }">
			</div>
			<ul class="list { empty: RgSelect.filtereditems.length == 0 }">
				<li each="{ RgSelect.filtereditems }"
						onclick="{ parent.select }"
						class="item { selected: selected, disabled: disabled, active: active }">
					{ text }
				</li>
			</ul>
		</div>
	</div>

	<script>
		/* istanbul ignore next */
		const handleClickOutside = e => {
			if (!this.root.contains(e.target)) {
				this.RgSelect.close()
				this.update()
			}
		}

		this.handleKeys = e => {
			if ([13, 38, 40].indexOf(e.keyCode) > -1 && !this.RgSelect.isvisible) {
				e.preventDefault()
				this.toggle()
				return true
			}
			if (this.RgSelect.autocomplete && !this.RgSelect.isvisible) this.toggle()
			var length = this.RgSelect.filtereditems.length
			if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault()
				// Get the currently selected item
				var activeIndex = null
				for (let i = 0; i < length; i++) {
					let item = this.RgSelect.filtereditems[i]
					if (item.active) {
						activeIndex = i
						break
					}
				}

				// We're leaving this item
				if (activeIndex != null) this.RgSelect.filtereditems[activeIndex].active = false

				if (e.keyCode == 38) {
					// Move the active state to the next item lower down the index
					if (activeIndex == null || activeIndex == 0)
						this.RgSelect.filtereditems[length - 1].active = true
					else
						this.RgSelect.filtereditems[activeIndex - 1].active = true
				} else if (e.keyCode == 40) {
					// Move the active state to the next item higher up the index
					if (activeIndex == null || activeIndex == length - 1)
						this.RgSelect.filtereditems[0].active = true
					else
						this.RgSelect.filtereditems[activeIndex + 1].active = true
				} else if (e.keyCode == 13 && activeIndex != null) {
					this.select({ item: this.RgSelect.filtereditems[activeIndex] })
				}
			}
			return true
		};

		this.toggle = () => {
			this.RgSelect.toggle()
		}

		this.filter = () => {
			let text = this.filterfield.value
			if (this.RgSelect.autocomplete) text = this.autocompletefield.value
			this.RgSelect.filter(text)
		}

		this.select = item => {
			item = item.item
			this.RgSelect.select(item)
		}

		this.on('mount', () => {
			this.RgSelect = opts.select || new rg.Select(opts)
			this.RgSelect.on('update', () => {
				if (this.RgSelect.isvisible) this.filter()
				this.update()
			})
			this.RgSelect.on('select', item => {
				this.selectfield.value = item[this.RgSelect.filteron]
				this.autocompletefield.value = item[this.RgSelect.filteron]
				this.update()
			})
			document.addEventListener('click', handleClickOutside)

			this.filter()
			this.update()
		})

		this.on('unmount', () => {
			document.removeEventListener('click', handleClickOutside)
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
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
		}

		.dropdown {
			display: none;
			position: absolute;
			width: 100%;
			background-color: white;
			border-bottom: 1px solid #D3D3D3;
			box-sizing: border-box;
			overflow-y: auto;
			overflow-x: hidden;
			max-height: 280px;
			z-index: 10;
		}

		.dropdown.isvisible {
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
