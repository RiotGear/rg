<rg-select>

	<input type="{ opts.select.filter ? 'search' : 'text' }"
				 name="selectfield"
				 class="field"
				 placeholder="{ opts.select.placeholder }"
				 onkeydown="{ keydown }"
				 onfocus="{ open }"
				 readonly="{ !opts.select.filter }">

	<ul class="menu menu--high" if="{ isvisible }">
		<li each="{ options }" onclick="{ parent.select }"
				 class="menu__item { 'menu__item--active': selected, 'menu__item--disabled': disabled, 'menu__item--hover': active }">
			{ text }
		</li>
	</ul>

	<script>
		/* istanbul ignore next */
		if (!opts.select) opts.select = { options: [] }

		const handleClickOutside = e => {
			if (!this.root.contains(e.target)) this.close()
			this.update()
		}

		this.on('mount', () => {
			document.addEventListener('click', handleClickOutside)
			this.update()
		})

		this.on('unmount', () => {
			document.removeEventListener('click', handleClickOutside)
		})

		this.keydown = e => {
			const was_open = this.visible
			this.open()
			if (e.keyCode === 38) { // ArrowUp
				this.navigate(-1)
				e.preventDefault()
			} else if (e.keyCode === 40) { // ArrowDown
				this.navigate(1)
				e.preventDefault()
			} else if (e.keyCode === 13) { // enter
				if (!was_open) {
					// if enter is pressed and wasn't opened, just open (above) and leave
					return
				}
				const item = getActiveItem() || this.options[0]
				item && this.select({ item })
				is_open && this.close()
				e.preventDefault()
			} else {
				this._navigate(0)
			}
		}

		this.select = e => {
			const value = e.item.text
			getInput().value = e.item.text
			this.trigger('select', e.item.text)
			opts.onselect && opts.onselect(e.item, this)
			opts.select.options.forEach(o => o.selected = false)
			e.item.selected = true
			this.close()
		}

		this.navigate = dir => {
			const { options } = this
			let new_index = (options.findIndex(o => o.active) + dir) % options.length
			// javascript doesn't mod properly :(
			if (new_index < 0) {
				new_index = options.length - 1
			}
			this._navigate(new_index)
		}

		this._navigate = index => {
			opts.select.options.forEach(o => o.active = false)
			const item = this.options[index || 0]
			if (item) {
				item.active = true
			}
		}

		this.on('update', () => {
			const value = getValue()
			this.options = opts.select.options
			if (opts.select.filter) {
				if (value) {
					const r = new RegExp(value,'i')
					this.options = this.options.filter( o => o.text.match(r))
					this.trigger('filter')
				}
			}
		})

		const getValue = () => getInput().value
		const getInput = () => this.root.querySelector('input') || {}
		const getActiveItem = () => {
			return this.options.find(o => o.active)
		}

		this.open = (e) => {
			this.isvisible = true
			this.trigger('open')
		}

		this.close = (e) => {
			this.isvisible = false
			this.trigger('close')
		}

	</script>

	<style scoped>
		.menu {
			position: absolute;
		}

	</style>

</rg-select>
