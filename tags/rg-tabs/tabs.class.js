;(() => {
	if (!window.rg) window.rg = {}
	window.rg.Tabs = class Tabs {

		constructor(opts) {
			riot.observable(this)
			if (!opts) opts = {}
			this._tabs = opts.tabs
		}

		update() {
			this.trigger('update')
		}

		get tabs() {
			if (Array.isArray(this._tabs)) {
				let activeTab = false
				this._tabs.forEach((tab, i) => {
					tab.index = i

					if (activeTab) tab.active = false
					if (tab.active) activeTab = true
				})
				return this._tabs
			}
			this._tabs = []
			return this._tabs
		}

		set tabs(tabs) {
			this._tabs = tabs
		}

		open(tab) {
			if (!tab.disabled) {
				this.tabs.forEach(tab => {
					tab.active = false
				})
				this.trigger('open', tab)
				tab.active = true
			}
		}
	}
})()