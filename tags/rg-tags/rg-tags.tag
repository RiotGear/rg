<rg-tags>

	<div class="tags">
	  <span class="tags__container">
	    <button each="{ opts.tags.tags }" onclick="{ removeTag }" type="button" class="button button--primary tag">
				{ text }
	      <span class="tag__close">×</span>
	    </button>
	  </span>
    <rg-select select={select_opts} onselect={select}/>
	</div>

	<script>
		/* istanbul ignore next */
		if (!opts.tags) opts.tags = { options: [], tags: [] }
		if (!opts.tags.options) opts.tags.options = []
		if (!opts.tags.tags) opts.tags.tags = []
    this.select_opts = {
      filter: true,
    }
    Object.assign(this.select_opts,opts.tags)

		const handleClickOutside = e => {
			if (!this.root.contains(e.target)) this.close()
			this.update()
		}

		const applyFieldText = () => {
			const input = this.root.querySelector("input")
			if (input) {
				input.value = ''
			}
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
						return attr && attr.toLowerCase().indexOf(this.root.querySelector("input").value.toLowerCase()) > -1
					})
			this.trigger('filter', this.root.querySelector("input").value)
		}

		this.navigate = e => {
      if ([13, 38, 40].indexOf(e.keyCode) > -1) {
			  if (!opts.tags.isvisible) {
				  this.open()
			  }
			  var length = this.options.length
			  if (length > 0) {
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
      }
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
