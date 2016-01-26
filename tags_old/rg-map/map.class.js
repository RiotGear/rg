;(() => {
	window.rg = window.rg || {}
	const gmap = {
		initialize: () => {
			gmap.trigger('initialize')
		}
	}
	riot.observable(gmap)
	window.rg.gmap = gmap

	rg.Map = class RgMap {

		constructor(opts) {
			riot.observable(this)
			this._options = opts
		}

		update() {
			this.trigger('update')
		}

		get options() {
			if (!this._options) {
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
})()