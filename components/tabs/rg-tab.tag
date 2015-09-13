<rg-tab>

	<div show="{ active }" class="tab">
		<yield/>
	</div>

	<script>
		this.active = opts.active;
		this.disabled = opts.disabled;
	</script>

	<style>

		.tab {
			padding: 10px;
		}

	</style>

</rg-tab>
