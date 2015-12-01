class RgPhoneSim {

	constructor(opts) {
		riot.observable(this)
		if (!opts) opts = {}
		this._url = opts.url
	}

	update() {
		this.trigger('update')
	}

	get url() {
		return this._url || ''
	}

	set url(url) {
		this._url = url
	}
}
