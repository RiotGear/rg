<rg-tabs>
	<div class="tabs { 'tabs--' + opts.tabs.type }">
		<div class="tabs__headings">
			<div each="{ opts.tabs.tabs }" class="tab-heading { 'tab-heading--active': active, 'tab-heading--disabled': disabled }" onclick="{ parent.open }">
				{ heading }
			</div>
		</div>
		<div each="{ opts.tabs.tabs }" class="tabs__tab { 'tabs__tab--active': active }">
			{ tab.text }
			<rg-raw if="{ tab.raw }" content="{ tab.raw }" />
				{ text }
			<div if="{ include }">
				{ include.responseText }
			</div>
		</div>
	</div>

	<script>
		if (!opts.tabs) opts.tabs = {}

		this.on('mount', () => this.update())
		const fetch = (tab) => {
			if (tab.raw) { return }
			const req = new XMLHttpRequest()
			req.onload = resp => {
				tab.raw = req.responseText
				tab.text = undefined
				this.update()
				this.trigger('loaded', tab)
			}
			req.open('get', tab.include, true)
			req.send()
			this.trigger('loading', tab)
		}

		this.open = e => {
			let tab = e.item
			if (!tab.disabled && !tab.active) {
				opts.tabs.tabs.forEach(tab => {
					tab.active = false
				})
				this.trigger('open', tab)
				tab.active = true
			}
		}

		this.on('update', () => {
			if (!Array.isArray(opts.tabs.tabs)) return
			opts.tabs.tabs.forEach(tab => {
				if (!tab.disabled && tab.active && tab.include) {
					fetch(tab)
				}
			})
		})

	</script>

</rg-tabs>
