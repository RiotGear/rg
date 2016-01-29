<rg-tabs>
	<div class="headers">
		<div each="{ opts.tabs.tabs }" class="header { active: active, disabled: disabled }" onclick="{ parent.open }">
			<div class="heading">
				{ heading }
			</div>
		</div>
	</div>
	<div each="{ opts.tabs.tabs }" class="tab { active: active }">
		<div if="{ text }">
			{ text }
		</div>
		<div if="{ include }">
			{ include.responseText }
		</div>
	</div>

	<script>
		const fetch = (tab) => {
			const req = new XMLHttpRequest()
			req.onload = resp => {
				this.root.querySelector('.tab.active').innerHTML = req.responseText
			}
			req.open('get', tab.include, true)
			req.send()
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
				if (!tab.disabled && tab.active && tab.include) fetch(tab)
			})
		})

	</script>

	<style scoped>
		.headers {
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
		}

		.header {
			-webkit-flex: 1;
			-ms-flex: 1;
			flex: 1;
			box-sizing: border-box;
			text-align: center;
			cursor: pointer;
			box-shadow: 0 -1px 0 0 #000 inset;
		}

		.heading {
			padding: 10px;
			margin: 0;
		}

		.header.active {
			background-color: #000;
		}

		.header.active .heading {
			color: white;
		}

		.header.disabled .heading {
			color: #888;
		}

		.tab {
			display: none;
			padding: 10px;
		}

		.tab.active {
			display: block;
		}

	</style>
</rg-tabs>
