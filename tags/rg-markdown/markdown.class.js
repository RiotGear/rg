class RgMarkdown {

	constructor(opts) {
		riot.observable(this)
		if (!opts) opts = {}
		if (commonmark) {
			this.reader = new commonmark.Parser()
			this.writer = new commonmark.HtmlRenderer()
		}
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

	parse(md) {
		var parsed = this.reader.parse(md)
		this.trigger('parse', this.writer.render(parsed))
		return this.writer.render(parsed)
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
