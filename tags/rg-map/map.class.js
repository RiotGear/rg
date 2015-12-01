class RgMap {

	constructor(opts) {
		riot.observable(this)
		this._options = opts
		const map = {
			initialize: () => {
				map.trigger('initialize')
			}
		}

		riot.observable(map)

		if (!window.rg) window.rg = {}
		rg.map = map
	}

	update() {
		this.trigger('update')
	}

	get options() {
		if (this._options) {
			this._options = {
				center: {
					lat: 53.806,
					lng: -1.535
				},
				zoom: 7
			}
		}

		return this._options
	}
}
