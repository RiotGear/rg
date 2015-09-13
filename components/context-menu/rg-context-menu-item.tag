<rg-context-menu-item>

	<div class="item { inactive: opts.inactive }" onclick="{ selectItem }">
		<yield/>
	</div>

	<script>
		this.selectItem = () => {
			if (!opts.inactive) {
				if (opts.onselect) opts.onselect(opts)

				this.parent.opts.menu.opened = false
				this.parent.update()
			}
		}
	</script>

</rg-context-menu-item>
