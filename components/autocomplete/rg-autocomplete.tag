<rg-autocomplete>

	<div class="container { open: opened }" style="width: { width }">
		<input type="{ opts.type || 'text' }" name="textbox"
					 placeholder="{ opts.placeholder }"
					 onkeydown="{ handleKeys }"
					 oninput="{ filterItems }"
					 onfocus="{ filterItems }">

		<div class="dropdown { open: opened }" show="{ opened }">
			<div class="list">
				<ul>
					<li each="{ filteredItems }"
							onclick="{ parent.select }"
							class="item { active: active }">
						{ text }
					</li>
				</ul>
			</div>
		</div>
	</div>

	<script>
		this.opened = true
		this.textbox.value = opts.value || ''

		this.filterItems = () => {
			this.filteredItems = opts.items.filter((item) => {
				item.active = false;
				if (this.textbox.value.length == 0 ||
					item.text.toString().toLowerCase().indexOf(this.textbox.value.toString().toLowerCase()) > -1) {
					return true
				}
			})
			if (this.filteredItems.length > 0) {
				this.opened = true
			}
			if (opts.onfilter) {
				opts.onfilter()
			}
			this.update()
		}

		this.handleKeys = (e) => {
			var length = this.filteredItems.length
			if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
				this.opened = true
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
					this.select({ item: this.filteredItems[activeIndex] })
			}
			return true
		};

		this.select = (item) => {
			item = item.item
			if (opts.onselect) opts.onselect(item)
			this.textbox.value = item.text
			this.opened = false
		}

		this.closeDropdown = (e) => {
			if (!this.root.contains(e.target)) {
				if (opts.onclose && this.opened) opts.onclose()
				this.opened = false
				this.update()
			}
		};

		this.on('mount', () => {
			document.addEventListener('click', this.closeDropdown)
			document.addEventListener('focus', this.closeDropdown, true)
			this.width = this.textbox.getBoundingClientRect().width + 'px'
			var dd = this.root.querySelector('.dropdown')
			dd.style.width = this.width
			dd.style.position = 'absolute'
			this.opened = opts.opened
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

		.container.open {
			-webkit-box-shadow: 0 2px 10px -4px #444;
			-moz-box-shadow: 0 2px 10px -4px #444;
			box-shadow: 0 2px 10px -4px #444;
		}

		input {
			font-size: 1em;
			padding: 10px;
			border: 1px solid #D3D3D3;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			outline: none;
		}

		.container.open input {
		}

		.dropdown {
			position: relative;
			background-color: white;
			border: 1px solid #D3D3D3;
			border-top: 0;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			overflow-y: auto;
			overflow-x: hidden;
		}

		.dropdown.open {
			-webkit-box-shadow: 0 2px 10px -4px #444;
			-moz-box-shadow: 0 2px 10px -4px #444;
			box-shadow: 0 2px 10px -4px #444;
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

		li:first-child {
			border-top: 0;
		}

		li:hover {
			background-color: #f3f3f3;
		}

		li.active,
		li:hover.active {
			background-color: #ededed;
		}


	</style>
</rg-autocomplete>
