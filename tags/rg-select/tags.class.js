class RgTags extends RgSelect {

	constructor(opts) {
		super(opts)
		this._tags = opts.tags
		this._value = opts.value
	}

	get value() {
		return this._value || ''
	}

	set value(val) {
		this._value = val
	}

	get tags() {
		if (Array.isArray(this._tags)) return this._tags
		this._tags = []
		return this._tags
	}

	set tags(tags) {
		if (!Array.isArray(tags)) tags = []
		tags.forEach((item, i) => {
			item.id = item.id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36)
		})
		this._tags = tags
	}

	addTag(tag) {
		tag.id = tag.id || (Math.floor(Math.random() * 60466175) + 1679615).toString(36)
		this.tags.push(tag)
		this.isvisible = false
		this.trigger('add', this.tags[this.tags.length - 1])
	}

	removeTag(tag) {
		this.tags.splice(this.tags.indexOf(tag), 1)
		this.isvisible = false
		this.trigger('remove', tag)
	}
}
