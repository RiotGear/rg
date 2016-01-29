<rg-drawer>

	<div class="overlay" if="{ opts.drawer.isvisible }" onclick="{ close }"></div>

	<div class="drawer { 'drawer--' + opts.drawer.position || 'drawer--bottom' } { 'drawer--visible': opts.drawer.isvisible }">
		<h4 class="heading heading--xsmall">{ opts.drawer.header }</h4>

		<ul class="menu">
			<li class="menu__item { 'menu__item--active': active }" each="{ opts.drawer.items }" onclick="{ parent.select }">
				{ text }
			</li>
		</ul>

		<div class="drawer__body">
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
