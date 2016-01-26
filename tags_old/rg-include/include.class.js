;(() => {
	window.rg = window.rg || {}
	rg.Include = class RgInclude {

		constructor(opts) {
			riot.observable(this)
			if (!opts) opts = {}
			this._unsafe = opts.unsafe
			this._url = opts.url
		}

		update() {
			this.trigger('update')
		}

		get unsafe() {
			return (this._unsafe == 'true' || this._unsafe === true)
		}

		set unsafe(unsafe) {
			this._unsafe = unsafe
		}

		get url() {
			return this._url || ''
		}

		set url(url) {
			if (this.url != url) {
				this._url = url
			}
		}

		fetch() {
			const req = new XMLHttpRequest()
			req.onload = resp => {
				this.trigger('fetch', req.responseText)
			}
			req.open('get', this.url, true)
			req.send()
		}
	}
})()