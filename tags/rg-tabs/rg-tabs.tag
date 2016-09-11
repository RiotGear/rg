<rg-tabs>
	<div class="c-tabs { 'c-tabs--' + opts.tabs.type }">
		<div class="c-tabs__headings">
			<div each="{ opts.tabs.tabs }" class="c-tab-heading { 'c-tab-heading--active': active, 'c-tab-heading--disabled': disabled }" onclick="{ parent.open }">
				{ heading }
			</div>
		</div>
		<div each="{ opts.tabs.tabs }" class="c-tabs__tab { 'c-tabs__tab--active': active }">
			<div if="{ text }">
				{ text }
			</div>
			<div if="{ include }">
				{ include.responseText }
			</div>
		</div>
	</div>

	<script>
		const fetch = (tab) => {
			const req = new XMLHttpRequest()
			req.onload = resp => {
				const activeTab = this.root.querySelector('.c-tabs__tab--active')
				if (activeTab) activeTab.innerHTML = req.responseText
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
			if (!opts.tabs) opts.tabs = {}
			if (!Array.isArray(opts.tabs.tabs)) return
			opts.tabs.tabs.forEach(tab => {
				if (!tab.disabled && tab.active && tab.include) {
					fetch(tab)
				}
			})
		})

	</script>

</rg-tabs>
