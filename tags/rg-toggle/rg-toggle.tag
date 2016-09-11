<rg-toggle>

	<div class="c-toggle { 'c-toggle--' + opts.toggle.type }">
		<label class="c-toggle__wrapper">
			<input type="checkbox" checked="{ opts.toggle.checked }" onclick="{ toggle }">
			<div class="c-toggle__track">
				<div class="c-toggle__handle"></div>
			</div>
		</label>
	</div>

	<script>
		this.on('mount', () => {
			if (!opts.toggle) opts.toggle = {
				checked: false
			}
		})

		this.toggle = () => {
			opts.toggle.checked = !opts.toggle.checked
			this.trigger('toggle', opts.toggle.checked)
		}

	</script>

</rg-toggle>
