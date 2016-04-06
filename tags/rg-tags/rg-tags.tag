<rg-tags>

	<div class="tags">
	  <span class="tags__container">
	    <button each="{ opts.tags.tags }" onclick="{ removeTag }" type="button" class="button button--primary tag">
				{ text }
	      <span class="tag__close">×</span>
	    </button>
	  </span>
	  <div class="tags__field-container">
			<input type="{ opts.tags.filter ? 'search' : 'text' }"
						 name="selectfield"
						 class="field"
						 placeholder="{ opts.tags.placeholder }"
						 onkeydown="{ navigate }"
						 oninput="{ filterOptions }"
						 onfocus="{ open }"
						 readonly="{ !opts.tags.filter }">

			<ul class="menu menu--high" if="{ opts.tags.isvisible }">
				<li each="{ options }" no-reorder
						onclick="{ parent.select }"
						class="menu__item { 'menu__item--active': selected, 'menu__item--disabled': disabled, 'menu__item--hover': active }">
					{ text }
				</li>
			</ul>
	  </div>
	</div>

	<script>
		/* istanbul ignore next */
		if (!opts.tags) opts.tags = { options: [], tags: [] }
		if (!opts.tags.options) opts.tags.options = []
		if (!opts.tags.tags) opts.tags.tags = []

		const handleClickOutside = e => {
			if (!this.root.contains(e.target)) this.close()
			this.update()
		}

		const applyFieldText = () => {
			this.selectfield.value = ''
			for (let i = 0; i < opts.tags.options.length; i++) {
				let item = opts.tags.options[i]
				item.selected = false
			}
		}

		this.filterOptions = () => {
			this.options = opts.tags.options
			if (opts.tags.filter)
				this.options = this.options.filter(option => {
						const attr = option[opts.tags.filter]
						return attr && attr.toLowerCase().indexOf(this.selectfield.value.toLowerCase()) > -1
					})
			this.trigger('filter', this.selectfield.value)
		}

		function getWindowDimensions() {
			var w = window,
				d = document,
				e = d.documentElement,
				g = d.getElementsByTagName('body')[0],
				x = w.innerWidth || e.clientWidth || g.clientWidth,
				y = w.innerHeight || e.clientHeight || g.clientHeight
			return { width: x, height: y }
		}

		const positionDropdown = () => {
			const w = getWindowDimensions()
			const m = this.root.querySelector('.menu')
			if (!m) return
			if (!opts.tags.isvisible) {
				// Reset position
				m.style.marginTop = ''
				m.style.marginLeft = ''
				return
			}
			const pos = m.getBoundingClientRect()
			if (w.width < pos.left + pos.width) {
				// menu is off the right hand of the page
				m.style.marginLeft = (w.width - (pos.left + pos.width) - 20) + 'px'
			}
			if (pos.left < 0) {
				// menu is off the right hand of the page
				m.style.marginLeft = '20px'
			}
			if (w.height < pos.top + pos.height) {
				// Popup is off the bottom of the page
				m.style.marginTop = (w.height - (pos.top + pos.height) - 20) + 'px'
			}
		}

		this.navigate = e => {
			if ([13, 38, 40].indexOf(e.keyCode) > -1 && !opts.tags.isvisible) {
				e.preventDefault()
				this.open()
				return true
			}
			var length = this.options.length
			if (length > 0 && [13, 38, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault()
				// Get the currently selected item
				var activeIndex = null
				for (let i = 0; i < length; i++) {
					let item = this.options[i]
					if (item.active) {
						activeIndex = i
						break
					}
				}

				// We're leaving this item
				if (activeIndex != null) this.options[activeIndex].active = false

				if (e.keyCode == 38) {
					// Move the active state to the next item lower down the index
					if (activeIndex == null || activeIndex == 0)
						this.options[length - 1].active = true
					else
						this.options[activeIndex - 1].active = true
				} else if (e.keyCode == 40) {
					// Move the active state to the next item higher up the index
					if (activeIndex == null || activeIndex == length - 1)
						this.options[0].active = true
					else
						this.options[activeIndex + 1].active = true
				} else if (e.keyCode == 13 && activeIndex != null) {
					this.select({
						item: this.options[activeIndex]
					})
				}
			}
			return true
		}

		this.open = () => {
			opts.tags.isvisible = true
			this.trigger('open')
		}

		this.close = () => {
			if (opts.tags.isvisible) {
				opts.tags.isvisible = false
				this.trigger('close')
			}
		}

		this.select = e => {
			opts.tags.options.forEach(i => i.selected = false)
			e.item.selected = true
			this.addTag(e.item)
			applyFieldText()
			this.filterOptions()
			this.trigger('select', e.item)
		}

		this.addTag = item => {
			if (opts.tags.tags.indexOf(item) == -1) {
				opts.tags.tags.push(item)
			}
		}

		this.removeTag = e => {
			opts.tags.tags = opts.tags.tags.filter(tag => {
				if (tag._id != e.item._id) return tag
			})
		}

		this.on('mount', () => {
			applyFieldText()
			this.filterOptions()
			document.addEventListener('click', handleClickOutside)
			this.update()
		})
		
		this.on('update', () => {
			opts.tags.options.forEach(item => {
				item._id = item._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36)
			})
			opts.tags.tags.forEach(tag => {
				tag._id = tag._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36)
			})

			if (!opts.tags.filter) applyFieldText()
			positionDropdown()
		})

		this.on('unmount', () => {
			document.removeEventListener('click', handleClickOutside)
		})
	</script>

	<style scoped>
		.menu {
			position: absolute;
		}

	</style>

</rg-tags>
