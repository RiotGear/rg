class RgBubble {

	constructor(opts) {
		riot.observable(this)
		if (!opts) opts = {}
		this._isvisible = opts.isvisible
		this._content = opts.content
	}

	update() {
		this.trigger('update')
	}

	get isvisible() {
		return (this._isvisible == 'true' || this._isvisible === true)
	}

	set isvisible(isvisible) {
		this._isvisible = isvisible
	}

	get content() {
		return this._content || ''
	}

	set content(content) {
		this._content = content
	}

	showBubble() {
		clearTimeout(this._timer)
		this.isvisible = true
	}

	hideBubble() {
		this._timer = setTimeout(() => {
			this.isvisible = false
			this.update()
		}, 1000)
	}

	toggleBubble() {
		this.isvisible = !this.isvisible
	}
}
