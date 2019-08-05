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
		this.on('mount', () => this.update())

		/* istanbul ignore next */
		if (!opts.tags) opts.tags = { options: [], tags: [] }
		if (!opts.tags.options) opts.tags.options = []
		if (!opts.tags.tags) opts.tags.tags = []
    this.select_opts = {
      filter: true,
    }
    Object.assign(this.select_opts, opts.tags)

		this.select = (item, tag) => {
			this.addTag(item)
			this.trigger('select', item)
			this.root.querySelector('input').value = ''
			this.update()
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

		this.on('update', () => {
			opts.tags.options.forEach(item => {
				item._id = item._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36)
			})
			opts.tags.tags.forEach(tag => {
				tag._id = tag._id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36)
			})

		})
	</script>

	<style scoped>
		.menu {
			position: absolute;
		}

	</style>

</rg-tags>
