<rg-toggle>

	<div class="toggle { 'toggle--' + opts.toggle.type }">
		<label class="toggle__wrapper">
			<input type="checkbox" checked="{ opts.toggle.checked }" onclick="{ toggle }">
			<div class="toggle__track">
				<div class="toggle__handle"></div>
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
