<rg-drawer>

	<div class="c-overlay" if="{ opts.drawer.isvisible }" onclick="{ close }"></div>

	<div class="c-drawer { 'c-drawer--' + opts.drawer.position || 'c-drawer--bottom' } { 'c-drawer--visible': opts.drawer.isvisible }">
		<h4 class="c-heading c-heading--xsmall">{ opts.drawer.header }</h4>

		<ul class="c-menu">
			<li class="c-menu__item { 'c-menu__item--active': active }" each="{ opts.drawer.items }" onclick="{ parent.select }">
				{ text }
			</li>
		</ul>

		<div class="c-drawer__body">
			<yield/>
		</div>
	</div>

	<script>
		this.on('mount', () => {
			if (!opts.drawer) opts.drawer = {}
		})

		this.close = () => {
			opts.drawer.isvisible = false
			this.trigger('close')
		}

		this.select = e => {
			opts.drawer.items.forEach(item => item.active = false)
			e.item.active = true
			this.trigger('select', e.item)
		}

	</script>

</rg-drawer>
